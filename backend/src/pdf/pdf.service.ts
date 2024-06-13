import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { TemplatesSettings } from '../templates/entities/templates.settings';
import { TemplateService } from 'src/templates/template.service';
import { TravelBookWithCustomerAndSections } from 'src/prisma/types/travel-books.types';

@Injectable()
export class PdfService {
  constructor(private templateService: TemplateService) {}

  async export(travelBook: TravelBookWithCustomerAndSections, templateName: string) {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    const html = await this.templateService.build(travelBook, templateName);
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
    const html = await this.templateService.build(data, templateName);
    return html;
  }
}
