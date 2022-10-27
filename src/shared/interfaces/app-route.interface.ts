import { NextRouter } from 'next/router';

import { Session } from 'modules/auth';

export interface ClientContext {
  session: Session;
  router: NextRouter;
}

export interface IAppRoute {
  label: string;
  path: string;
  displayNav?: boolean | ((context: ClientContext) => boolean);
}
