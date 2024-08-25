import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateSectionDto } from './create-section.dto';
export class CreateTravelBookDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  destination: string;

  @IsObject()
  @IsOptional()
  theme: object;

  @ValidateNested()
  @Type(() => CreateSectionDto)
  sections: CreateSectionDto[];

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
