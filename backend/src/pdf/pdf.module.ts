import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { CloudStorageModule } from 'src/cloud-storage/cloud-storage.module';

@Module({
  providers: [PdfService],
  exports: [PdfService],
  imports: [CloudStorageModule],
})
export class PdfModule {}
