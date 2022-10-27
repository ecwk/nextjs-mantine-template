import { Jwt } from 'jsonwebtoken';

import { IUser } from 'modules/users';

export interface ISessionData extends Record<string, any> {
  user: IUser;
  jwt: Jwt & {
    encoded: string;
  };
}
