import { IBaseModel } from 'shared/interfaces';

export interface IUser extends IBaseModel {
  username: string;
  email: string;
  name: string;
  avatar: string;
  bio: string;
  role: 'user' | 'admin';
}
