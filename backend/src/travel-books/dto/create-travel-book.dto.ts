import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SectionDto } from './section.dto';

export class CreateTravelBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  destination: string;

  @ValidateNested()
  @Type(() => SectionDto)
  sections: SectionDto[];

  @IsDateString()
  @IsOptional()
  start_date: string;

  @IsDateString()
  @IsOptional()
  end_date: string;

  @IsNumber()
  @IsOptional()
  customer_id: number;
}
