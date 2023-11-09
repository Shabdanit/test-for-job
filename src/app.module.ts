import { Module, OnModuleDestroy } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { JwtModule } from '@nestjs/jwt';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { BookModule } from './book/book.module';
import { MikroORM } from '@mikro-orm/core';
import { DatabaseModule } from './database/database.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt-strategy';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'super-secret',
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
    BookModule,
    DatabaseModule,
  ],
  controllers: [AppController, UserController, BookController],
  providers: [AppService, UserService, BookService, JwtStrategy],
})
export class AppModule implements OnModuleDestroy {
  constructor(private readonly orm: MikroORM) {}

  async onModuleDestroy(): Promise<void> {
    await this.orm.close();
  }
}
