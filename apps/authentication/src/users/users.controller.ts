// apps\authentication\src\users\users.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Patterns } from '../common/messaging/patterns';

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
}