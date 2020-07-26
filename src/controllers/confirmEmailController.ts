import { Response, Request } from 'express';
import { redis } from '../utils/redis';
import User from '../entity/User/user.postgres';
import ERRORS from '../constants/ERRORS';
import SUCCESS from '../constants/SUCCESS';

export async function confirmEmailController(req: Request, res: Response) {
  const { id } = req.params;

  const userId = await redis.get(id);
  if (!userId)
    return res.status(400).json({ message: ERRORS.CONFIRM_LINK.EXPIRED });

  const { affected } = await User.update({ id: userId }, { isConfirmed: true });
  if (!affected)
    return res
      .status(400)
      .json({ message: ERRORS.CONFIRM_LINK.FAILED_CONFIRM });

  return res.status(200).json({ message: SUCCESS.CONFIRM_LINK.CONFIRM });
}
