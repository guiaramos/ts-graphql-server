import { ContextFunction } from 'apollo-server-core';
import { Redis } from 'ioredis';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { DocumentNode } from 'graphql';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { redis } from '../utils/redis';
import { resolversPath, typesDefsPath } from '../paths';

export interface CustomContext {
  redis: Redis;
  url: string;
}

export default function GraphQLSetup() {
  const getTypeDefs = () => {
    const typesDefsArray = loadFilesSync(typesDefsPath);
    return mergeTypeDefs(typesDefsArray);
  };

  const getResolvers = () => {
    const resolversArray = loadFilesSync(resolversPath);
    return mergeResolvers(resolversArray);
  };

  const getExecutableSchema = (typeDefs: DocumentNode, resolvers: any) => {
    return makeExecutableSchema({
      typeDefs,
      resolvers
    });
  };

  const getContext: ContextFunction<ExpressContext, CustomContext> = ({
    req
  }) => {
    return { redis, url: `${req.protocol}://${req.get('host')}` };
  };

  const getProps = () => {
    const typeDefs = getTypeDefs();
    const resolvers = getResolvers();
    const schema = getExecutableSchema(typeDefs, resolvers);
    const context = getContext;
    return {
      typeDefs,
      resolvers,
      schema,
      context
    };
  };

  return {
    getProps
  };
}
