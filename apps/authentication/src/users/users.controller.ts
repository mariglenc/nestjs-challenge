// apps\authentication\src\users\users.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Patterns } from '../common/messaging/patterns';
import { LoginUserDto } from './dto/login-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(Patterns.USERS_REGISTER)
  async register(@Payload() dto: CreateUserDto): Promise<any> {
    return this.usersService.register(dto);
  }

  @MessagePattern(Patterns.USERS_FIND_ALL)
  async findAll(): Promise<any> {
    return this.usersService.findAll();
  }

  @MessagePattern(Patterns.USERS_LOGIN)
  async login(@Payload() dto: LoginUserDto) {
    return this.usersService.login(dto);
  }
}