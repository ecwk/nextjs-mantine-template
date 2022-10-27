import { AxiosInstance } from 'axios';
import { faker } from '@faker-js/faker';

import { sleep } from 'shared/utils';
import { client } from 'shared/config';
import { IUser, ICreateUserDTO, generateUser } from 'modules/users';
import { IResponse, IServerValidationError } from 'shared/interfaces';

type FindUsersResponse = IResponse<{ users: IUser[] }>;

type CreateUserResponse =
  | IResponse<{ message: string }>
  | IResponse<{ errors: IServerValidationError[] }, 'fail'>;

export class UsersAPI {
  constructor(private readonly axios: AxiosInstance = client) {}

  async findAll(): Promise<FindUsersResponse> {
    // const res = await this.axios.get<FindUsersResponse>('/users');
    // return res.data;

    await sleep();
    return {
      status: 'success',
      data: {
        users: Array(
          faker.datatype.number({
            min: 1,
            max: 10
          })
        )
          .fill(0)
          .map(() => generateUser())
      }
    };
  }

  async create(dto: ICreateUserDTO): Promise<CreateUserResponse> {
    // const res = await this.axios.post('/users', dto);
    // return res.data;

    await sleep();
    const isSuccess = Math.random() >= 0.5;
    if (isSuccess) {
      return {
        status: 'success',
        data: {
          message: 'User created successfully'
        }
      };
    }
    return {
      status: 'fail',
      data: {
        errors: [
          {
            field: 'email',
            message: 'Email already exists'
          }
        ]
      }
    };
  }
}

export const clientUsersAPI = new UsersAPI();
