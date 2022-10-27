import { ResponseStatus } from 'shared/types';

// T must be an object of any kind
export interface IResponse<
  T extends Record<string, any> = Record<string, any>,
  S extends ResponseStatus = 'success'
> {
  data: T;
  status: S;
}
