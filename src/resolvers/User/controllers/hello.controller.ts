import { IQueryResolvers } from '../../../generated/graphql';

const queryHello: IQueryResolvers['hello'] = async (_, { name }) => {
  return `Hello ${name || 'World'}`;
};

export default queryHello;
