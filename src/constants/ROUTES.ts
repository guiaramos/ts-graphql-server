import { loadEnv } from '../lib/loadEnvironment';

loadEnv();

export const SERVER_HOST = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`;
export const GRAPHQL_HOST = `${SERVER_HOST}/${process.env.ENDPOINT}`;

export default {
  CONFIRM_EMAIL: `/confirm`
};
