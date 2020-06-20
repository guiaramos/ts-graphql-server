import { IResolvers } from '../../generated/graphql';
import queryHello from './controllers/hello.controller';
import mutationRegister from './controllers/register.controller';

const resolvers: IResolvers = {
  Query: {
    hello: queryHello
  },
  Mutation: {
    register: mutationRegister
  }
};

export default resolvers;
