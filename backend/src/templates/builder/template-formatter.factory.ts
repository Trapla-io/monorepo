import { Templates } from '../entities/templates.enum';
import { FlatYellowFormatter } from '../items/flat-yellow/formatter';
import { TravelBookWithCustomer } from 'src/prisma/types/travel-books.types';

export class TemplateFormatterFactory {
  static create(name: string, travelBook: TravelBookWithCustomer) {
    switch (name) {
      case Templates.FlatYellow:
        return new FlatYellowFormatter(travelBook);
      default:
        throw new Error(`Formatter for template ${name} not found`);
    }
  }
}
