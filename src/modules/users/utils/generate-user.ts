import { faker } from '@faker-js/faker';

import { IUser } from '../interfaces';

export const generateUser = (role: IUser['role'] = 'user'): IUser => ({
  id: String(faker.helpers.unique(faker.datatype.number)),
  avatar: faker.image.avatar(),
  email: faker.internet.email(),
  name: faker.name.firstName(),
  bio: faker.lorem.paragraph(),
  username: faker.internet.userName(),
  role: role
});
