import { IResolvers } from '../../generated/graphql';
import queryHello from './controllers/hello.controller';

const resolvers: IResolvers = {
  Query: {
    hello: queryHello
  }
};

export default resolvers;
