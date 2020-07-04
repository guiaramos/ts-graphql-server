// import { FetchResult, GraphQLRequest } from 'apollo-link/lib/types';
import http from 'http';
// import Observable from 'zen-observable-ts';
import { startTestServer } from './__utils';
import server from '../server';

describe('Server - e2e', () => {
  let stop: () => Promise<http.Server>;
  // let graphql: ({
  //   query,
  //   variables
  // }: GraphQLRequest) => Observable<FetchResult>;

  beforeEach(async () => {
    const testServer = await startTestServer(server.apollo.create());
    stop = testServer.stop;
    // graphql = testServer.graphql;
  });

  afterEach(async () => stop());

  it('should start without error', function() {});
});
