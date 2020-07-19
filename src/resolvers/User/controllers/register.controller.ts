import * as yup from 'yup';
import * as bcrypt from 'bcrypt';
import { UserInputError } from 'apollo-server-express';
import { IMutationResolvers } from '../../../generated/graphql';
import User from '../../../entity/User/user.postgres';
import ERRORS from '../../../constants/ERRORS';
import SUCCESS from '../../../constants/SUCCESS';
import { formatYupError } from '../../../lib/formatYupError';

const schema = yup.object().shape({
  email: yup
    .string()
    .min(3)
    .max(255)
    .email(),
  password: yup
    .string()
    .min(3)
    .max(255)
});

const mutationRegister: IMutationResolvers['register'] = async (
  _,
  { email, password }
) => {
  try {
    await schema.validate({ email, password });
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword }).save();
    return { message: SUCCESS.USER.CREATED };
  } catch (error) {
    if (error instanceof yup.ValidationError) formatYupError(error, email);
    throw new UserInputError(ERRORS.USER.ALREADY_EXISTS, { email });
  }
};

export default mutationRegister;
