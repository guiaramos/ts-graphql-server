import { IResolvers } from '../../generated/graphql';
import mutationRegister from './controllers/register.controller';

const resolvers: IResolvers = {
  Mutation: {
    register: mutationRegister
  }
};

export default resolvers;
