import { loadEnv } from './src/lib/loadEnvoriment';
import { ConnectionOptions } from 'typeorm';

loadEnv();

const entities = ['src/entity/**/**.postgres.ts'];
const subscribers = ['src/subscriber/**/*.ts'];
const migrations = ['src/migration/**/*.ts'];

const connectionOptions: ConnectionOptions[] = [
  {
    name: 'development',
    type: 'postgres',
    database: String(process.env.TYPEORM_DATABASE),
    host: String(process.env.TYPEORM_HOST),
    port: Number(process.env.TYPEORM_PORT),
    username: String(process.env.TYPEORM_USERNAME),
    password: String(process.env.TYPEORM_PASSWORD),
    synchronize: true,
    logging: true,
    entities,
    migrations,
    subscribers
    // dropSchema: true,
  },
  {
    name: 'test',
    type: 'postgres',
    database: String(process.env.TYPEORM_DATABASE),
    host: String(process.env.TYPEORM_HOST),
    port: Number(process.env.TYPEORM_PORT),
    username: String(process.env.TYPEORM_USERNAME),
    password: String(process.env.TYPEORM_PASSWORD),
    synchronize: true,
    logging: true,
    entities,
    migrations,
    subscribers,
    dropSchema: true
  }
];

module.exports = connectionOptions;
