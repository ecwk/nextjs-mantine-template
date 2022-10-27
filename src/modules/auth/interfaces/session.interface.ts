import { SessionStatus } from 'modules/auth';

export interface ISession<T, S extends SessionStatus> {
  data: T;
  status: S;
}
