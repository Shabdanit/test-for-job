// create-book.dto.ts
import { IsNotEmpty, IsString, IsInt, MinLength } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly author: User;

  @IsNotEmpty()
  @IsInt()
  readonly year: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  readonly description: string;
}
