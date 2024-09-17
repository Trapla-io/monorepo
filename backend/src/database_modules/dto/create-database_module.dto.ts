import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class CreateDatabaseModuleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsObject()
  content: object;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  tag_ids: number[];
}
