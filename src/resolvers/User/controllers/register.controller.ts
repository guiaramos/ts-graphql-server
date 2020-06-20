import { IMutationResolvers } from '../../../generated/graphql';

const mutationRegister: IMutationResolvers['register'] = async (
  _,
  { email, password }
) => {
  console.log('email: ', email);
  console.log('password: ', password);
  return true;
};

export default mutationRegister;
