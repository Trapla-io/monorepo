import { IsNotEmpty, IsNumber, IsObject } from "class-validator";

export class SyncDatabaseModuleDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsObject()
  content: object;
}
