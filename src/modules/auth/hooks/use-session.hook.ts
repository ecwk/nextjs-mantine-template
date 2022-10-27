import { useContext } from 'react';

import { SessionContext } from 'modules/auth';

export const useSession = () => {
  return useContext(SessionContext);
};
