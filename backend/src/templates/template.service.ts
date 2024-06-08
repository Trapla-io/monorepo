import { Injectable } from '@nestjs/common';
import { TemplateBuilder } from './builder/template.builder';
import { TravelBookWithCustomer } from 'src/prisma/types/travel-books.types';

@Injectable()
export class TemplateService {
  async build(travelBook: TravelBookWithCustomer, templateName: string) {
    const builder = new TemplateBuilder(templateName, travelBook);
    return await builder.perform();
  }
}
