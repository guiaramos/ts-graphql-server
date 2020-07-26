import { Redis } from 'ioredis';
import { v4 } from 'uuid';
import ROUTES, { SERVER_HOST } from '../constants/ROUTES';

export async function createConfirmedEmailLink(userId: string, redis: Redis) {
  const id = v4();
  await redis.set(id, userId, 'ex', 60 * 60 * 24);
  return `${SERVER_HOST}${ROUTES.CONFIRM_EMAIL}/${id}`;
}
