import { PageParams } from '../../../api/apiTypes';
import { usePaginationList } from '../../../hooks/usePaginationList';
import { QueryKeys } from '../../../types/infraTypes';
import { userService } from '../userService';

export function useUserSearch(search: string) {
  const getList = (pageParams: PageParams) => {
    return userService.getList({ pageParams, search });
  };
  return usePaginationList(
    {
      queryKey: [QueryKeys.UserGetList, search],
      getList,
      options: {
        enabled: search.length > 0,
        staleTime: 30000,
      },
    });
}
