import { PartialType } from '@nestjs/mapped-types';
import { CreateTravelBookDto } from './create-travel-book.dto';
import { ValidateNested } from 'class-validator';
import { SectionDto } from './section.dto';
import { Type } from 'class-transformer';

export class UpdateTravelBookDto extends PartialType(CreateTravelBookDto) {
  @ValidateNested()
  @Type(() => SectionDto)
  sections: SectionDto[];
}
