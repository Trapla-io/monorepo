import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
