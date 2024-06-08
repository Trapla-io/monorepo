import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { CloudStorageModule } from 'src/cloud-storage/cloud-storage.module';
import { CustomersModule } from 'src/customers/customers.module';
import { TemplateModule } from 'src/templates/template.module';

@Module({
  providers: [PdfService],
  exports: [PdfService],
  imports: [CloudStorageModule, CustomersModule, TemplateModule],
})
export class PdfModule {}
