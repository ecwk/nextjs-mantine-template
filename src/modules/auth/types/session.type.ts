import { ISession, ISessionData } from 'modules/auth';

type AuthenticatedSession = ISession<ISessionData, 'authenticated'>;
type UnauthenticatedSession = ISession<
  Partial<ISessionData>,
  'unauthenticated'
>;
type LoadingSession = ISession<Partial<ISessionData>, 'loading'>;

export type Session =
  | AuthenticatedSession
  | UnauthenticatedSession
  | LoadingSession;
