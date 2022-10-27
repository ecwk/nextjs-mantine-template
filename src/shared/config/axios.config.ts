import axios from 'axios';

import { env } from './env.config';
import { sleep } from 'shared/utils';

export const client = axios.create({
  baseURL: env.apiUrl,
  validateStatus: (status) => status < 500
});

if (process.env.NODE_ENV === 'development') {
  client.interceptors.request.use(async (config) => {
    await sleep();

    return config;
  });
}

export const server = axios.create({
  baseURL: env.apiUrl
});
