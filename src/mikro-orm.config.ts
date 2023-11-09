import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { join } from 'path';

const config: MikroOrmModuleOptions = {
  migrations: {
    path: join(__dirname, './migrations'),
    pathTs: join(__dirname, './migrations'),
  },
  entities: [join(__dirname, './entities')],
  entitiesTs: [join(__dirname, './entities')],
  host: 'localhost',
  port: 5432,
  dbName: 'postgres',
  user: 'postgres',
  password: '1101',
  type: 'postgresql',
  debug: process.env.NODE_ENV !== 'prod',
  logger: console.log,
};

export default config;
