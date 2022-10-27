import { useQuery } from '@tanstack/react-query';

import { clientUsersAPI } from 'modules/users';

export const useUsers = () => {
  const query = useQuery(['/users'], clientUsersAPI.findAll);
  return query;
};
