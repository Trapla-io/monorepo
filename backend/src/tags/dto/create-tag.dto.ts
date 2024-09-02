import { IsHexColor, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsHexColor()
  @IsOptional()
  color: string;
}
