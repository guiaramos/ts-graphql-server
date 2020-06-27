import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const entities = ['src/entity/**/*.postgres.ts'];
const subscribers = ['src/subscriber/**/*.ts'];
const migrations = ['src/migration/**/*.ts'];

const defaultConnection: ConnectionOptions = {
  name: String(process.env.TYPEORM_NAME),
  type: 'postgres',
  database: String(process.env.TYPEORM_DATABASE),
  host: String(process.env.TYPEORM_HOST),
  port: Number(process.env.TYPEORM_PORT),
  username: String(process.env.TYPEORM_USERNAME),
  password: String(process.env.TYPEORM_PASSWORD),
  synchronize: Boolean(process.env.TYPEORM_AUTO_SCHEMA_SYNC),
  logging: Boolean(process.env.TYPEORM_LOGGING),
  entities,
  migrations,
  subscribers
  // dropSchema: true,
};

export { defaultConnection };
