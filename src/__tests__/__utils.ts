import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import { execute, GraphQLRequest, toPromise } from 'apollo-link';
import { ApolloServer } from 'apollo-server-express';
import http from 'http';
import Observable from 'zen-observable-ts';
import { FetchResult } from 'apollo-link/lib/types';
import {
  ApolloServerTestClient,
  createTestClient
} from 'apollo-server-testing';
import ServerFactory from '../server';

module.exports.toPromise = toPromise;

/**
 * Integration testing utils
 */
export const constructTestServer = () => {
  const server = ServerFactory.apollo.create();

  return { server };
};

/**
 * e2e Testing Utils
 */
export const startTestServer = async (server: ApolloServer) => {
  await ServerFactory.connectionPG.create();
  const app = await ServerFactory.app.create();
  ServerFactory.applyMiddlewares(server, app);
  const httpServer = await app.listen(0);

  const link = new HttpLink({
    uri: `http://localhost:${0}`,
    fetch: fetch as any
  });

  const executeOperation = ({
    query,
    variables = {}
  }: GraphQLRequest): Observable<FetchResult> =>
    execute(link, { query, variables });

  const stop = async (): Promise<http.Server> => {
    await ServerFactory.connectionPG.close();
    return httpServer.close();
  };

  return {
    link,
    stop,
    graphql: executeOperation
  };
};

/**
 * Test Server
 */
export function testClient(): ApolloServerTestClient {
  const { server } = constructTestServer();
  const { mutate, query } = createTestClient(server);
  return { query, mutate };
}
