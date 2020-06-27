import { request } from 'graphql-request';
import { HOST } from '../../../constants/host';
global.fetch = require('node-fetch');

// Variables
const email = 'fake@fake.com';
const password = 'qwer1234';

// Query
const mutation = `
mutation{
  register(email: "${email}", password: "${password}")
}
`;

describe('Register User Mutation', () => {
  it('Should receive true from the mutation', async () => {
    const response = await request(HOST, mutation);
    expect(response).toEqual({ register: true });
  });
  // describe('Database check', () => {
  //   it('Should find the user email on db', async () => {
  //     const user = await User.findOneOrFail({ where: { email } });
  //     expect(user.email).toEqual(email);
  //   });
  //   it('Should have hashed password', async () => {
  //     const user = await User.findOneOrFail({ where: { email } });
  //     expect(user.password).not.toEqual(password);
  //   });
  // });
});
