import { IsNotEmpty, IsString, IsInt, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description: string;
}
