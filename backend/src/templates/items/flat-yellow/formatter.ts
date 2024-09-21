import { TravelBookWithCustomerAndSections } from 'src/prisma/types/travel-books.types';
import { AbstractTemplateFormatter } from 'src/templates/builder/abstract.template-formatter';

export class FlatYellowFormatter extends AbstractTemplateFormatter {
  constructor(travelBook: TravelBookWithCustomerAndSections) {
    super(travelBook);

    const cover: any = travelBook.sections.find(
      (section: any) => section.tag === 'cover',
    );

    if (cover) {
      this.coverTitle = cover.title;
    } else {
      this.coverTitle = '';
    }
  }

  formatCover(cover) {
    return {
      data: {
        customerName: this.getCustomerName(),
        startDate: this.formatDate(this.travelBook.start_date),
        endDate: this.formatDate(this.travelBook.end_date),
        summary: this.travelBook.sections
          .filter((section: any) => section.tag !== 'cover')
          .map((section: any, index) => ({
            title: section.title,
            index: index + 1,
          })),
        ...cover,
      },
      theme: this.travelBook.theme,
    };
  }

  formatTransports(transports) {
    const routes = this.managePageBreaks(transports.items.list);
    return {
      data: {
        coverTitle: this.coverTitle,
        routes: routes.map((route) => ({
          ...route,
          departure_date: this.formatDate(route.departure_date),
          arrival_date: this.formatDate(route.arrival_date),
        })),
        ...transports,
      },
      theme: this.travelBook.theme,
    };
  }

  formatContact(contact) {
    return {
      data: {
        coverTitle: this.coverTitle,
        ...contact,
      },
      theme: this.travelBook.theme,
    };
  }

  formatUsefulInformations(usefulInformations) {
    return {
      data: {
        coverTitle: this.coverTitle,
        informations: this.managePageBreaks(usefulInformations.items.list),
        ...usefulInformations,
      },
      theme: this.travelBook.theme,
    };
  }

  formatCheckList(checkList) {
    return {
      data: {
        coverTitle: this.coverTitle,
        checkList: this.managePageBreaks(checkList.items.list),
        ...checkList,
      },
      theme: this.travelBook.theme,
    };
  }

  formatItinerary(itinerary) {
    return {
      data: {
        ...itinerary,
        coverTitle: this.coverTitle,
        steps: itinerary.items.list,
      },
      theme: this.travelBook.theme,
    };
  }

  formatAccommodations(accommodations) {
    const formattedAccommodations = this.managePageBreaks(
      accommodations.items.list,
    );
    return {
      data: {
        coverTitle: this.coverTitle,
        accommodations: formattedAccommodations.map((accommodation) => ({
          ...accommodation,
          arrival_date: this.formatDate(accommodation.arrival_date),
          departure_date: this.formatDate(accommodation.departure_date),
        })),
        ...accommodations,
      },
      theme: this.travelBook.theme,
    };
  }

  formatMap(map) {
    return {
      data: {
        coverTitle: this.coverTitle,
        ...map,
      },
      theme: this.travelBook.theme,
    };
  }

  private getCustomerName() {
    if (!this.travelBook.customer) {
      return '';
    }
    const { first_name, last_name } = this.travelBook.customer;
    return `${first_name} ${last_name}`;
  }

  private coverTitle: string;
}
