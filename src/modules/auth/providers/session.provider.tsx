import { useState } from 'react';
import { useRouter } from 'next/router';
import jwtTool, { Jwt } from 'jsonwebtoken';
import { deleteCookie, setCookie } from 'cookies-next';

import { client } from 'shared/config';
import { Session } from 'modules/auth';
import { SessionContext, clientAuthAPI } from 'modules/auth';

type Props = {
  children: React.ReactNode;
  session: Session;
};

export const SessionProvider = (props: Props) => {
  const [session, setSession] = useState<Session>(props.session);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    if (session.status === 'authenticated') {
      return true;
    }

    setSession({ status: 'loading', data: {} });
    const loginRes = await clientAuthAPI.login(email, password);

    if (loginRes.status === 'success') {
      const jwt = loginRes.data.jwt;
      client.defaults.headers.Authorization = `Bearer ${jwt}`;
      const whoamiRes = await clientAuthAPI.whoami();
      if (whoamiRes.status === 'success') {
        const user = whoamiRes.data.user;
        const decodedJwt = jwtTool.decode(jwt, { complete: true }) as Jwt;
        setCookie('jwt', jwt);
        setSession({
          status: 'authenticated',
          data: {
            user,
            jwt: {
              ...decodedJwt,
              encoded: jwt
            }
          }
        });
        return true;
      }
    }
    setSession({ status: 'unauthenticated', data: {} });
    return false;
  };

  const logout = async () => {
    setSession({
      status: 'unauthenticated',
      data: {}
    });
    deleteCookie('jwt');
    router.reload();
    return true;
  };

  return (
    <SessionContext.Provider value={{ session, login, logout }}>
      {props.children}
    </SessionContext.Provider>
  );
};
