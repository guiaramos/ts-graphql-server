import { UserInputError } from 'apollo-server-express';
import { ValidationError } from 'yup';

export function formatYupError(error: ValidationError, errorInfo?: string) {
  throw new UserInputError(error.errors[0], { errorInfo });
}
