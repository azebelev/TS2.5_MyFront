import { Router, Request, Response } from 'express';
const router = Router();
import User from '../model/userSchema';

router.get('/', async (req: Request, res: Response) => {
  const user_id = req.session.user_id;

  if (!user_id) {
    res.status(403).send({ error: 'forbidden' });
  } else {
    const user = await User.findById(user_id);
    res.status(200).send({ items: user.items });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { text } = req.body;
  const user = await User.findById(req.session.user_id);
  const task_id = await user.addNewTask(text);
  res.status(201).send({ id: task_id });
});

router.delete('/', async (req: Request, res: Response) => {
  try {
    const { id: task_id } = req.body;
    const user = await User.findById(req.session.user_id);
    await user.deleteTaskById(task_id);
  } catch (error) {
    console.log(error);
    res.status(500).send({});
  }
  res.status(200).send({ ok: true });
});

router.put('/', async (req: Request, res: Response) => {
  try {
    const { text, id, checked } = req.body;
    const user = await User.findById(req.session.user_id);
    await user.updateTask({ text, id, checked });
    res.status(200).send({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({});
  }
});

export default router;