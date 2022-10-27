import { AxiosInstance } from 'axios';

import { sleep } from 'shared/utils';
import { client } from 'shared/config';
import { IResponse } from 'shared/interfaces';
import { IUser, generateUser } from 'modules/users';
import { USER_JWT, ADMIN_JWT } from 'shared/constants';

type LoginSuccessResponse = IResponse<{ jwt: string }, 'success'>;
type LoginFailResponse = IResponse<{ message: string }, 'fail'>;
type LoginResponse = LoginSuccessResponse | LoginFailResponse;

type WhoamiSuccessResponse = IResponse<{ user: IUser }, 'success'>;
type WhoamiFailResponse = IResponse<{ message: string }, 'fail'>;
type WhoamiResponse = WhoamiSuccessResponse | WhoamiFailResponse;

export class AuthAPI {
  constructor(private readonly axios: AxiosInstance = client) {}

  public async login(email: string, password: string): Promise<LoginResponse> {
    // const res = await this.axios.post('/auth/login', { email, password });
    // return res.data;

    await sleep();
    if (email === 'test@internal.com' && password === 'test') {
      return {
        status: 'success',
        data: {
          jwt: USER_JWT
        }
      };
    } else if (email === 'root@internal.com' && password === 'root') {
      return {
        status: 'success',
        data: {
          jwt: ADMIN_JWT
        }
      };
    }
    return {
      status: 'fail',
      data: {
        message: 'Invalid email or password'
      }
    };
  }

  public async whoami(): Promise<WhoamiResponse> {
    // const res = await this.axios.get('/auth/whoami');
    // return res.data;

    await sleep();
    const jwt = String(this.axios.defaults.headers.Authorization).split(' ')[1];

    switch (jwt) {
      case USER_JWT:
        return {
          status: 'success',
          data: {
            user: generateUser()
          }
        };
      case ADMIN_JWT:
        return {
          status: 'success',
          data: {
            user: generateUser('admin')
          }
        };
      default:
        return {
          status: 'fail',
          data: {
            message: 'Unauthorized'
          }
        };
    }
  }
}

export const clientAuthAPI = new AuthAPI();
