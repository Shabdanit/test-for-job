// user.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/core';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const user = this.em.create(User, createUserDto);
    await user.setPassword(createUserDto.password);
    await this.userRepository.persistAndFlush(user);
    return user;
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userRepository.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      userId: user.id,
      username: user.name,
      email: user.email,
    };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}
