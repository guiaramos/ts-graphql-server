import { createTestClient } from 'apollo-server-testing';
import { constructTestServer } from './__utils';
import { REGISTER } from './__documents/user.documents';
import ServerFactory from '../server';

describe('Mutations', function() {
  beforeAll(async () => {
    await ServerFactory.connectionPG.create();
  });

  afterAll(async () => ServerFactory.connectionPG.close());

  describe('User', function() {
    it('should register the user', async function() {
      const { server } = constructTestServer();
      const { mutate } = createTestClient(server);
      const response = await mutate({
        mutation: REGISTER,
        variables: { email: 'test@test.com', password: 'qwer1234' }
      });
      expect(response?.data?.register).toBeTruthy();
    });

    it('should return error if user already exists', async function() {
      const { server } = constructTestServer();
      const { mutate } = createTestClient(server);
      const response = await mutate({
        mutation: REGISTER,
        variables: { email: 'test@test.com', password: 'qwer1234' }
      });
      const message = response?.errors;
      expect(message ? message[0].message : 'no error message').toContain(
        'duplicate key value violates unique constraint'
      );
    });
  });
});

//  TODO:  A TEST TO RETURN ERROR WHEN REGISTER SAME USER
// Should have hashed password
// Should find the user email on db
