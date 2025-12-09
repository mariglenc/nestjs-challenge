// apps\authentication\src\users\users.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async register(dto: CreateUserDto) {
    const exists = await this.usersRepo.findByEmail(dto.email);
    if (exists) throw new ConflictException('Email already in use');

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
}
