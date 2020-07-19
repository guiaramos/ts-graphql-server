import * as bcrypt from 'bcrypt';
import { IMutationResolvers } from '../../../generated/graphql';
import User from '../../../entity/User/user.postgres';

const mutationRegister: IMutationResolvers['register'] = async (
  _,
  { email, password }
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashedPassword }).save();
  return true;
};

export default mutationRegister;
