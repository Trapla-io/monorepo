import * as moment from 'moment';
import { TravelBookWithCustomerAndSections } from 'src/prisma/types/travel-books.types';

export abstract class AbstractTemplateFormatter {
  constructor(travelBook: TravelBookWithCustomerAndSections) {
    this.travelBook = travelBook;
  }

  public formatSection(section) {
    return this.formatters[section.tag](section);
  }

  protected managePageBreaks(array) {
    return array.map((item, index) => ({
      ...item,
      pageBreak: array.length - 1 === index ? 'always' : 'auto',
    }));
  }

  protected formatDate(date, format = 'DD/MM/YYYY') {
    return date ? moment(date).format(format) : null;
  }

  protected abstract formatCover(cover);
  protected abstract formatTransports(transports);
  protected abstract formatContact(contact);
  protected abstract formatUsefulInformations(usefulInformations);
  protected abstract formatCheckList(checkList);
  protected abstract formatItinerary(itinerary);
  protected abstract formatAccommodations(accommodations);
  protected abstract formatMap(map);

  private formatters = {
    cover: this.formatCover.bind(this),
    transports: this.formatTransports.bind(this),
    contact: this.formatContact.bind(this),
    'useful-informations': this.formatUsefulInformations.bind(this),
    'check-list': this.formatCheckList.bind(this),
    itinerary: this.formatItinerary.bind(this),
    accommodations: this.formatAccommodations.bind(this),
    map: this.formatMap.bind(this),
  };
  protected travelBook: TravelBookWithCustomerAndSections;
}
