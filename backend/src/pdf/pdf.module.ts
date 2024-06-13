import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { TemplateModule } from 'src/templates/template.module';

@Module({
  providers: [PdfService],
  exports: [PdfService],
  imports: [TemplateModule],
})
export class PdfModule {}
