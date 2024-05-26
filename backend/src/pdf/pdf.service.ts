import { Injectable, NotFoundException } from '@nestjs/common';
import puppeteer from 'puppeteer';
import Handlebars from 'handlebars';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as moment from 'moment';
import { TemplatesSettings } from './entities/templates.settings';
import { TravelBook } from '@prisma/client';
import { CustomersService } from 'src/customers/customers.service';

@Injectable()
export class PdfService {
  constructor(private customerService: CustomersService) {}

  private compileHandlebar(templateName: string, context: object) {
    try {
      const file = readFileSync(
        join(__dirname, `/templates/${templateName}/index.hbs`),
        'utf-8',
      );
      Handlebars.registerHelper('injectHTML', (htmlContent) => {
        return new Handlebars.SafeString(htmlContent);
      });
      const template = Handlebars.compile(file);

      return template(context);
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Template does not exist.');
    }
  }

  private async formatData(data) {
    const sectionsObject = {};
    const customer = await this.customerService.findOne(data.customer_id);

    data.sections.forEach((section) => {
      sectionsObject[section.tag] = section;
    });
    if (sectionsObject['useful-informations']) {
      sectionsObject['useful-informations'].items.informations = sectionsObject[
        'useful-informations'
      ].items.informations.map((information, index) => ({
        ...information,
        direction: index % 2 === 0 ? 'row' : 'row-reverse',
        pageBreak: sectionsObject['useful-informations'].items.informations.length - 1 === index ? 'always' : 'auto',
      }));
    }
    if (sectionsObject['check-list']) {
      sectionsObject['check-list'].items.check_list = sectionsObject[
        'check-list'
      ].items.check_list.map((checkListItem, index) => ({
        ...checkListItem,
        pageBreak: sectionsObject['check-list'].items.check_list.length - 1 === index ? 'always' : 'auto',
      }));
    }
    if (sectionsObject['accommodations']) {
      sectionsObject['accommodations'].items.accommodations = sectionsObject[
        'accommodations'
      ].items.accommodations.map((accommodation, index) => ({
        ...accommodation,
        arrival_date: moment(accommodation.arrival_date).format('DD/MM/YYYY'),
        departure_date: moment(accommodation.departure_date).format('DD/MM/YYYY'),
        pageBreak: sectionsObject['accommodations'].items.accommodations.length - 1 === index ? 'always' : 'auto',
      }));
    }
    if (sectionsObject['transports']) {
      sectionsObject['transports'].items.routes = sectionsObject['transports']
        .items.routes.map((route, index) => ({
          ...route,
          departure_date: moment(route.departure_date).format('DD/MM/YYYY'),
          arrival_date: moment(route.arrival_date).format('DD/MM/YYYY'),
          pageBreak: sectionsObject['transports'].items.routes.length - 1 === index ? 'always' : 'auto',
        }));
    }
    return {
      ...data,
      start_date: moment(data.start_date).format('DD/MM/YYYY'),
      end_date: moment(data.end_date).format('DD/MM/YYYY'),
      customerName: customer ? `${customer.first_name} ${customer.last_name}` : '',
      sections: sectionsObject,
      summary: data.sections.filter(section => section.tag !== 'cover').map((section, index) => ({
        title: section.title,
        index: index + 1,
      })),
    };
  }

  async export(travelBook: TravelBook, templateName: string) {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    const html = this.compileHandlebar(
      templateName,
      await this.formatData(travelBook),
    );
    const options = {
      printBackground: true,
      width: '890px',
      height: '1260px',
      ...TemplatesSettings[templateName],
    };
    await page.setContent(html);

    try {
      const buffer = await page.pdf(options);

      return buffer;
    } catch (error) {
      throw error;
    } finally {
      await browser.close();
    }
  }

  async preview(data, templateName: string) {
    const html = this.compileHandlebar(
      templateName,
      await this.formatData(data),
    );
    return html;
  }
}
