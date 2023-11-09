import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@CurrentUser() user, @Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto, user);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @CurrentUser() user,
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.bookService.update(+id, updateBookDto, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@CurrentUser() user, @Param('id') id: string) {
    return this.bookService.remove(+id, user);
  }
}
