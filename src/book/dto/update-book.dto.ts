// update-book.dto.ts
import { IsString, IsInt, MinLength } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class UpdateBookDto {
  @IsString()
  readonly title?: string;

  @IsString()
  readonly author?: User;

  @IsInt()
  readonly year?: number;

  @IsString()
  @MinLength(10)
  readonly description?: string;
}
