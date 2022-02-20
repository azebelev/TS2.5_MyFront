import { Router, Request, Response } from "express"
const router = Router()


router.post('/', (req: Request, res: Response) => {
  req.session.destroy((error) => {
    if (!error) res.clearCookie('connect.sid').json({ ok: true });

  });
});

export default router;