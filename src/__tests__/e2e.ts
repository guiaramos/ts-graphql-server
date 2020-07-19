import http from 'http';
import { TEST_DOCUMENT } from './__documents/test.documents';
// import { FetchResult, GraphQLRequest } from 'apollo-link/lib/types';
// import Observable from 'zen-observable-ts';
import { startTestServer, testClient } from './__utils';
import server from '../server';

describe('Server - e2e', () => {
  let stop: () => Promise<http.Server>;

  beforeEach(async () => {
    const testServer = await startTestServer(server.apollo.create());
    stop = testServer.stop;
  });

  afterEach(async () => stop());

  it('should start without error', async () => {
    const { query } = testClient();
    const response = await query({
      query: TEST_DOCUMENT,
      variables: { name: 'user' }
    });
    expect(response.data?.hello).toBeTruthy();
  });
});
