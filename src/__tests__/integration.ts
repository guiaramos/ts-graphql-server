import { REGISTER } from './__documents/user.documents';
import ServerFactory from '../server';
import User from '../entity/User/user.postgres';
import { testClient } from './__utils';
import ERRORS from '../constants/ERRORS';
import SUCCESS from '../constants/SUCCESS';

const MOCK_USER = { email: 'test@test.com', password: 'qwer1234' };

describe('Mutations', () => {
  beforeAll(async () => {
    await ServerFactory.connectionPG.create();
  });

  afterAll(async () => ServerFactory.connectionPG.close());

  describe('User', () => {
    it('should register the user', async () => {
      const { mutate } = testClient();
      const response = await mutate({
        mutation: REGISTER,
        variables: MOCK_USER
      });
      expect(response?.data?.register.message).toBe(SUCCESS.USER.CREATED);
    });

    it('should have hashed password', async () => {
      const { password } = await User.findOneOrFail({
        where: { email: MOCK_USER.email }
      });
      expect(password).not.toEqual(MOCK_USER.password);
    });

    it('should return error if user already exists', async () => {
      const { mutate } = testClient();
      const response = await mutate({
        mutation: REGISTER,
        variables: MOCK_USER
      });
      const message = response?.errors;
      expect(message ? message[0].message : 'no error message').toContain(
        ERRORS.USER.ALREADY_EXISTS
      );
    });

    it('should return error if email has less than 3 char', async () => {
      const { mutate } = testClient();
      const response = await mutate({
        mutation: REGISTER,
        variables: { email: 'aa', password: MOCK_USER.password }
      });
      const message = response?.errors;
      expect(message ? message[0].message : 'no error message').toContain(
        'email must be at least 3 characters'
      );
    });

    it('should return error if password is lass than 3 char', async () => {
      const { mutate } = testClient();
      const response = await mutate({
        mutation: REGISTER,
        variables: { email: MOCK_USER.email, password: 'q4' }
      });
      const message = response?.errors;
      expect(message ? message[0].message : 'no error message').toContain(
        'password must be at least 3 characters'
      );
    });

    it('should return error if input is an invalid email', async () => {
      const { mutate } = testClient();
      const response = await mutate({
        mutation: REGISTER,
        variables: { email: 'test@test.', password: MOCK_USER.password }
      });
      const message = response?.errors;
      expect(message ? message[0].message : 'no error message').toContain(
        'email must be a valid email'
      );
    });
  });
});
