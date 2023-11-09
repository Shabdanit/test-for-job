import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from './user.entity';

@Entity()
export class Book {
  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property()
  year: number;

  @Property()
  description: string;

  @ManyToOne(() => User)
  author: User;
}
