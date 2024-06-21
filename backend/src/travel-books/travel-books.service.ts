import { BadRequestException, Injectable, StreamableFile, UnauthorizedException } from '@nestjs/common';
import { CreateTravelBookDto } from './dto/create-travel-book.dto';
import { UpdateTravelBookDto } from './dto/update-travel-book.dto';
import { PdfService } from 'src/pdf/pdf.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateSectionDto } from './dto/create-section.dto';
import { SECTIONS } from '../helpers/travel-book-sections.helper';

const DEFAULT_THEME = {
  primary: '#0E5450',
  secondary: '#F99C30',
  text_dark: '#000',
  text_light: '#fff',
};

@Injectable()
export class TravelBooksService {
  constructor(private pdfService: PdfService, private prisma: PrismaService) {}

  async create(dto: CreateTravelBookDto, user: User) {
    const customer = dto.customer_id
      ? {
          customer: {
            connect: { id: dto.customer_id },
          },
        }
      : null;
    try {
      const travelBook = await this.prisma.travelBook.create({
        data: {
          title: dto.title,
          destination: dto.destination,
          start_date: dto.start_date,
          end_date: dto.end_date,
          theme: DEFAULT_THEME,
          ...(dto.customer_id ? customer : {}),
          user: {
            connect: {
              id: user.id,
            },
          },
          sections: {
            create: dto.sections,
          },
        },
      });
      return travelBook;
    } catch (error) {
      throw error;
    }
  }

  async findAll(user: User) {
    try {
      const travelBooks = await this.prisma.travelBook.findMany({
        where: {
          user_id: user.id,
        },
        include: {
          customer: true,
          sections: true,
        },
      });
      return travelBooks;
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} travelBook`;
  }

  async update(id: number, dto: UpdateTravelBookDto, user: User) {
    try {
      const travelBook = await this.prisma.travelBook.update({
        where: {
          id,
          user_id: user.id,
        },
        data: {
          ...dto,
          sections: {
            updateMany: [
              ...dto.sections.map((section) => ({
                where: {
                  id: section.id,
                },
                data: {
                  ...section,
                },
              })),
            ],
          },
        },
      });
      return travelBook;
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} travelBook`;
  }

  async export(id: number, user: User) {
    const travelBook = await this.prisma.travelBook.findUnique({
      where: {
        id,
      },
      include: {
        customer: true,
        sections: true,
      },
    });
    const pdf = await this.pdfService.export(
      travelBook,
      user.default_travel_book_template,
    );

    return new StreamableFile(pdf, { type: 'application/pdf' });
  }

  async preview(id: number, data, user: User) {
    try {
      const customer = await this.prisma.customer.findUnique({
        where: {
          id: data.customer_id,
        },
      });

      data.customer = customer;
      return await this.pdfService.preview(
        data,
        user.default_travel_book_template,
      );
    } catch (error) {
      throw error;
    }
  }

  async addSection(id: number, dto: CreateSectionDto, user: User) {
    try {
      const sectionData = SECTIONS.find((section) => section.tag === dto.tag);
      const travelBook = await this.prisma.travelBook.findUnique({
        where: {
          id,
          user_id: user.id,
        },
      });

      if (!travelBook) {
        throw new UnauthorizedException(
          'User does not have access to this travel book.',
        );
      }
      if (!sectionData) {
        throw new BadRequestException(`Section tag ${dto.tag} is not valid.`);
      }

      return await this.prisma.section.create({
        data: {
          ...sectionData,
          travel_book: {
            connect: {
              id,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async removeSection(id: number, sectionId: number, user: User) {
    try {
      const travelBook = await this.prisma.travelBook.findUnique({
        where: {
          id,
          user_id: user.id,
        },
      });

      if (!travelBook) {
        throw new UnauthorizedException(
          'User does not have access to this travel book.',
        );
      }

      await this.prisma.section.delete({
        where: {
          id: sectionId,
        },
      });
      return 'Section deleted successfully.';
    } catch (error) {
      throw error;
    }
  }
}
