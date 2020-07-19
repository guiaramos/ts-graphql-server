import * as bcrypt from 'bcrypt';
import { UserInputError } from 'apollo-server-express';
import { IMutationResolvers } from '../../../generated/graphql';
import User from '../../../entity/User/user.postgres';
import ERRORS from '../../../constants/ERRORS';
import SUCCESS from '../../../constants/SUCCESS';

const mutationRegister: IMutationResolvers['register'] = async (
  _,
  { email, password }
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword }).save();
    return { message: SUCCESS.USER.CREATED };
  } catch (error) {
    throw new UserInputError(ERRORS.USER.ALREADY_EXISTS, { email });
  }
};

export default mutationRegister;
