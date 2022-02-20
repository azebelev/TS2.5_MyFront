import { ObjectId } from 'mongoose';

declare module 'express-session' {
  interface SessionData {
    user_id: number | undefined;
  }
};
export type Task = {
  _id?: ObjectId,
  id?: string,
  text: string,
  checked: boolean
};
