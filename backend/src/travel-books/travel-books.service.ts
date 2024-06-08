import { Injectable, StreamableFile } from '@nestjs/common';
import { CreateTravelBookDto } from './dto/create-travel-book.dto';
import { UpdateTravelBookDto } from './dto/update-travel-book.dto';
import { PdfService } from 'src/pdf/pdf.service';
import { Templates } from 'src/templates/entities/templates.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

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
          sections: dto.sections,
          start_date: dto.start_date,
          end_date: dto.end_date,
          theme: DEFAULT_THEME,
          ...(dto.customer_id ? customer : {}),
          user: {
            connect: {
              id: user.id,
            },
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
}
