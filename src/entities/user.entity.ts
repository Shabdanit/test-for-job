import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Book } from './book.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property({ unique: true })
  email: string;

  @Property({ hidden: true })
  password: string;

  @OneToMany(() => Book, (book) => book.owner)
  book = new Collection<Book>(this);

  async setPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 10);
  }

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
