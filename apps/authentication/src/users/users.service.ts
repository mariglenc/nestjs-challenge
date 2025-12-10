// apps\authentication\src\users\users.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';

import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository, private readonly jwt: JwtService ) {}

  async register(dto: CreateUserDto) {
    const exists = await this.usersRepo.findByEmail(dto.email);
    if (exists) throw new RpcException('Email already in use');

    const created = await this.usersRepo.create({
      email: dto.email,
      password: dto.password,
      name: dto.name,
    });

    const { password, ...rest } = (created as any)._doc || created;
    return { id: (created as any)._id, ...rest };
  }

  async findAll() {
    const users = await this.usersRepo.findAll();
    return users.map((u: any) => ({ id: u._id, email: u.email, name: u.name }));
  }

  async login(dto: LoginUserDto) {
    const user = await this.usersRepo.findByEmail(dto.email);
    if (!user) {
      throw new RpcException('Invalid email');
    }

    if (user.password !== dto.password) {
      throw new RpcException('Invalid password');
    }

    const payload = {
      sub: user._id,
      email: user.email,
      name: user.name,
    };

    const token = await this.jwt.signAsync(payload);

    const { password, ...rest } = (user as any)._doc || user;

    return { ...rest, token };
  }
}
