import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MikroOrmModule.forFeature([User]), JwtModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, JwtModule, MikroOrmModule],
})
export class UserModule {}
