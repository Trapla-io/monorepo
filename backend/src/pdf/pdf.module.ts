import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { CloudStorageModule } from 'src/cloud-storage/cloud-storage.module';
import { CustomersModule } from 'src/customers/customers.module';

@Module({
  providers: [PdfService],
  exports: [PdfService],
  imports: [CloudStorageModule, CustomersModule],
})
export class PdfModule {}
