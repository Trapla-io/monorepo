import { Sections } from '../entities/sections';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AbstractTemplateFormatter } from './abstract.template-formatter';
import { TemplateFormatterFactory } from './template-formatter.factory';
import { TravelBookWithCustomerAndSections } from 'src/prisma/types/travel-books.types';
import Handlebars from 'handlebars';

class TemplateFile {
  name: string;
  content: string;
}

export class TemplateBuilder {
  constructor(name: string, travelBook: TravelBookWithCustomerAndSections) {
    this.name = name;
    this.travelBook = travelBook;
    this.formatter = TemplateFormatterFactory.create(name, travelBook);
    this.load();
  }

  public async perform() {
    let sectionsHTML = '';
    const orderedSections = this.travelBook.sections.sort(
      (a, b) => a.position - b.position,
    );

    orderedSections.forEach((section) => {
      sectionsHTML += this.compileSection(section);
    });

    return Handlebars.compile(this.getFileContent('index'))({
      content: sectionsHTML,
      theme: this.travelBook.theme,
    });
  }

  private load() {
    this.loadSectionFiles();
    this.loadIndexFile();
    this.registerHandlebarsHelpers();
  }

  private compileSection(section) {
    const context = this.formatter.formatSection(section);
    const template = Handlebars.compile(this.getFileContent(section.tag));

    return template(context);
  }

  private loadSectionFiles() {
    Sections.forEach((section) => {
      this.files.push({
        name: section,
        content: readFileSync(
          join(__dirname, `/../items/${this.name}/${section}.hbs`),
          'utf-8',
        ),
      });
    });
  }

  private loadIndexFile() {
    this.files.push({
      name: 'index',
      content: readFileSync(
        join(__dirname, `/../items/${this.name}/index.hbs`),
        'utf-8',
      ),
    });
  }

  private registerHandlebarsHelpers() {
    Handlebars.registerHelper('injectHTML', (htmlContent) => {
      return new Handlebars.SafeString(htmlContent);
    });
  }

  private getFileContent(fileName: string) {
    return this.files.find((file: TemplateFile) => file.name === fileName)
      .content;
  }

  private name: string;
  private travelBook: TravelBookWithCustomerAndSections;
  private files: TemplateFile[] = [];
  private formatter: AbstractTemplateFormatter;
}
