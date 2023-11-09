import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      if (
        !createUserDto.name ||
        !createUserDto.email ||
        !createUserDto.password
      ) {
        throw new HttpException(
          'All fields are required',
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = await this.userService.register(createUserDto);
      return { message: 'Registration successful', user };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/login')
  async login(
    @Body() { email, password }: { email: string; password: string },
  ) {
    try {
      if (!email || !password) {
        throw new HttpException(
          'Email and password are required',
          HttpStatus.BAD_REQUEST,
        );
      }

      const { token } = await this.userService.login(email, password);
      return { message: 'Login successful', token };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
