import { QueryFailedError } from 'typeorm';

const queryFailedGuard = (
  err: any
): err is QueryFailedError & { code: string } =>
  err instanceof QueryFailedError;

export default queryFailedGuard;
