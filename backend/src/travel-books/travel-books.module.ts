import { Module } from '@nestjs/common';
import { TravelBooksService } from './travel-books.service';
import { TravelBooksController } from './travel-books.controller';
import { PdfModule } from 'src/pdf/pdf.module';

@Module({
  controllers: [TravelBooksController],
  providers: [TravelBooksService],
  imports: [PdfModule],
})
export class TravelBooksModule {}
