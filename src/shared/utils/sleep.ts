import { faker } from '@faker-js/faker';

export const sleep = (
  ms: number = 0
  // ms: number = faker.datatype.number({ min: 500, max: 1500 })
) =>
  process.env.NODE_ENV === 'development' &&
  new Promise((resolve) => setTimeout(resolve, ms));
