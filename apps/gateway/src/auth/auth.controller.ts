// apps\gateway\src\auth\auth.controller.ts
import { Controller, Post, Body, Inject, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { Patterns } from '../common/messaging/patterns';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto): Promise<any> {
    return this.client.send(Patterns.USERS_REGISTER, dto).toPromise();
  }

  @Get('users')
  async findAll(): Promise<any> {
    return this.client.send(Patterns.USERS_FIND_ALL, {}).toPromise();
  }
}