import { useQuery } from '@tanstack/react-query';

import { userService } from '../userService';

import { QueryKeys } from './../../../types/infraTypes';

export function useUserGetById(
  userId: number,
) {

  const { data, isLoading, isError } = useQuery({
    queryKey: [QueryKeys.UserGetById, userId],
    queryFn: () => userService.getUser(userId),
  });

  return {
    isLoading,
    userData: data,
    error: isError,
  };
}
