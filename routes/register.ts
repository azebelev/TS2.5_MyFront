import { Router, Request, Response } from 'express';
const router = Router()
import User from '../model/userSchema'

router.post('/', async (req: Request, res: Response) => {
  const { login, pass } = req.body
  let user = await User.findOne({ login, pass });
  if (!user) {
    user = new User({ login, pass, items: [] });
    await user.save();
    res.status(201).send({ 'ok': true });
  } else {
    res.status(400).send({});
  }
});

export default router;