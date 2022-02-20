import { Router, Request, Response } from 'express';
const router = Router()
import User from '../model/userSchema'

router.all('/', async (req: Request, res: Response) => {

  switch (req.query.action) {

    case 'login': {
      let { login, pass } = req.body;
      let user = await User.findOne({ login, pass });
      if (user) {
        req.session.user_id = user._id;
        req.session.save();
        res.status(200).send({ 'ok': true });
      } else {
        res.status(404).send({ 'error': 'not found' });
      }
      break;
    }
    case 'register': {
      const { login, pass } = req.body;
      let user = await User.findOne({ login, pass });
      if (!user) {
        user = new User({ login, pass, items: [] });
        await user.save();
        res.status(201).send({ 'ok': true });
      } else {
        res.status(400).send({});
      }
      break;
    }
    case 'getItems': {
      const user_id = req.session.user_id;
      if (!user_id) {
        res.status(403).send({ error: 'forbidden' });
      } else {
        const user = await User.findById(user_id);
        res.status(200).send({ items: user.items });
      }
      break;
    }
    case 'deleteItem': {
      try {
        const { id: task_id } = req.body;
        const user = await User.findById(req.session.user_id);
        await user.deleteTaskById(task_id);
      } catch (error) {
        console.log(error);
        res.status(500).send({});
      }
      res.status(200).send({ ok: true });
      break;
    }
    case 'createItem': {
      const { text } = req.body;
      const user = await User.findById(req.session.user_id);
      const task_id = await user.addNewTask(text);
      res.status(201).send({ id: task_id });
      break;
    }
    case 'editItem': {
      try {
        const { text, id, checked } = req.body;
        const user = await User.findById(req.session.user_id);
        await user.updateTask({ text, id, checked });
        res.status(200).send({ ok: true });
      } catch (error) {
        console.log(error);
        res.status(500).send({});
      }
      break;
    }
    default: {
      req.session.destroy((error) => {
        if (!error) res.clearCookie('connect.sid');
        res.status(200).send({ "ok": true });
      });
      break;
    }
  }
})

export default router