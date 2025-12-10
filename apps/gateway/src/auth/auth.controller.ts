// apps/gateway/src/auth/auth.controller.ts
import { Controller, Post, Body, Inject, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { Patterns } from '../common/messaging/patterns';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto): Promise<any> {
    try {
      return await firstValueFrom(this.client.send(Patterns.USERS_REGISTER, dto));
    } catch (err: any) {
      // convert microservice error to proper HTTP response
      const status =
        err?.status && typeof err.status === 'number'
          ? err.status
          : HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(err?.message || 'Internal server error', status);
    }
  }

  @Get('users')
  async findAll(): Promise<any> {
    try {
      return await firstValueFrom(this.client.send(Patterns.USERS_FIND_ALL, {}));
    } catch (err: any) {
      const status =
        err?.status && typeof err.status === 'number'
          ? err.status
          : HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(err?.message || 'Internal server error', status);
    }
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto): Promise<any> {
    try {
      return await firstValueFrom(this.client.send(Patterns.USERS_LOGIN, dto));
    } catch (err: any) {
      throw new HttpException(err?.message || 'Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}