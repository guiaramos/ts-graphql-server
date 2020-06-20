import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { DocumentNode } from 'graphql';
import { resolversPath, typesDefsPath } from '../paths';

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

  const getProps = () => {
    const typeDefs = getTypeDefs();
    const resolvers = getResolvers();
    const schema = getExecutableSchema(typeDefs, resolvers);
    return {
      typeDefs,
      resolvers,
      schema
    };
  };

  return {
    getProps
  };
}
