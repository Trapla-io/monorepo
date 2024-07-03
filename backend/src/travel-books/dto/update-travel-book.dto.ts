import { PartialType } from '@nestjs/mapped-types';
import { CreateTravelBookDto } from './create-travel-book.dto';
import { IsOptional } from 'class-validator';

export class UpdateTravelBookDto extends PartialType(CreateTravelBookDto) {
  @IsOptional()
  theme: object;
}
