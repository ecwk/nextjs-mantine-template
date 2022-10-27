import { createContext } from 'react';

import { Session } from 'modules/auth';

export interface ISessionContext {
  session: Session;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
}

export const SessionContext = createContext<ISessionContext>(
  {} as ISessionContext
);
