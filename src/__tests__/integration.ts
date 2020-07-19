import { REGISTER } from './__documents/user.documents';
import ServerFactory from '../server';
import User from '../entity/User/user.postgres';
import { testClient } from './__utils';

const MOCK_USER = { email: 'test@test.com', password: 'qwer1234' };

describe('Mutations', function() {
  beforeAll(async () => {
    await ServerFactory.connectionPG.create();
  });

  afterAll(async () => ServerFactory.connectionPG.close());

  describe('User', function() {
    it('should register the user', async function() {
      const { mutate } = testClient();
      const response = await mutate({
        mutation: REGISTER,
        variables: MOCK_USER
      });
      expect(response?.data?.register).toBeTruthy();
    });

    it('should have hashed password', async function() {
      const { password } = await User.findOneOrFail({
        where: { email: MOCK_USER.email }
      });
      expect(password).not.toEqual(MOCK_USER.password);
    });

    it('should return error if user already exists', async function() {
      const { mutate } = testClient();
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
