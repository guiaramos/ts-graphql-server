import * as dotenv from 'dotenv';

dotenv.config();

export const HOST = `${process.env.CONNECTION}://${process.env.HOST}:${process.env.PORT}/${process.env.ENDPOINT}`;
