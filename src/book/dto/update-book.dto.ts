import { IsString, IsInt, MinLength } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  title?: string;

  @IsString()
  author?: string;

  @IsInt()
  year?: number;

  @IsString()
  @MinLength(10)
  description?: string;
}
