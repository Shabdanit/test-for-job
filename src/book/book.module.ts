import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from 'src/entities/book.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([Book])],
  controllers: [BookController],
  providers: [BookService],
  exports: [MikroOrmModule],
})
export class BookModule {}
