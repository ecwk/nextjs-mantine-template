import axios from 'axios';
import { getCookie } from 'cookies-next';
import jwtTool, { Jwt } from 'jsonwebtoken';
import { GetServerSidePropsContext, NextPageContext } from 'next';

import { env } from 'shared/config';
import { AuthAPI, Session } from 'modules/auth';
import { JWT_COOKIE_KEY } from 'shared/constants';

export const getSessionSSR = async (
  ctx: NextPageContext | GetServerSidePropsContext
): Promise<Session> => {
  const jwt = getCookie(JWT_COOKIE_KEY, ctx) as string;

  const authAPI = new AuthAPI(
    axios.create({
      baseURL: env.apiUrl,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
  );

  const res = await authAPI.whoami();
  if (res.status === 'success') {
    const decodedJwt = jwtTool.decode(jwt, { complete: true }) as Jwt;
    return {
      status: 'authenticated',
      data: {
        user: res.data.user,
        jwt: {
          ...decodedJwt,
          encoded: jwt
        }
      }
    };
  }
  return {
    status: 'unauthenticated',
    data: {}
  };
};
