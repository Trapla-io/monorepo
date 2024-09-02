import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDatabaseModuleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsArray()
  @IsNumber({}, { each: true })
  tag_ids: number[];
}
