// apps\authentication\src\users\dto\create-user.dto.ts
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email!: string;  // Add ! to indicate it will be assigned

  @IsString()
  @MinLength(6)
  password!: string;  // Add ! to indicate it will be assigned

  @IsOptional()
  @IsString()
  name?: string;
}