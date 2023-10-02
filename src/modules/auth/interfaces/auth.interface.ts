import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface AuthPayload {
  userId: string;
  uId: string;
  email: string;
  username: string;
  avatarColor: string;
  iat?: number;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: AuthPayload;
    }
  }
}

export interface IAuthEntity {
  uId: string;
  username: string;
  email: string;
  password?: string;
  avatarColor: string;
  avatorImage: string;
  createdAt: Date;
  passwordResetToken?: string;
  passwordResetExpires?: number | string;
}
export interface IAuthDocument extends IAuthEntity, Document {
  _id: string | ObjectId;
  comparePassword(password: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
}

export interface ISignUpData {
  _id: ObjectId;
  uId: string;
  email: string;
  username: string;
  password: string;
  avatarColor: string;
}

export interface IAuthJob {
  value?: string | IAuthDocument;
}
