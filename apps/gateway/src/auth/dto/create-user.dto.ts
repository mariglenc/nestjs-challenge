// apps\gateway\src\auth\dto\create-user.dto.ts
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email!: string;  // Add !

  @IsString()
  @MinLength(6)
  password!: string;  // Add !

  @IsOptional()
  @IsString()
  name?: string;
}