import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateTravelBookmarkDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsObject()
  data: object;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateTravelBookmarkDtoTag)
  tags: CreateTravelBookmarkDtoTag[];
}

class CreateTravelBookmarkDtoTag {
  @IsNotEmpty()
  @IsString()
  id: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  color: string;
}
