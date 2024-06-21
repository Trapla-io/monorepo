import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SectionDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  label: string;

  @IsNotEmpty()
  items: object;

  @IsNotEmpty()
  @IsString()
  tag: string;

  @IsNotEmpty()
  @IsString()
  icon: string;

  @IsNotEmpty()
  @IsNumber()
  position: number;

  @IsOptional()
  cover_image: object;
}
