import { useEffect, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { Page } from '../types/pages';

interface PaginatedListOption {
  /**
   * Set this to 'false' to disable automatic refetching when the query mounts or changes query keys.
   */
  enabled?: boolean;
  /**
   * Set time in milliseconds after data is considered stale.
   */
  staleTime?: number;
}

interface IUsePaginationList<Data> {
  queryKey: readonly unknown[];
  getList: ({ page, per_page }: {page: number, per_page: number}) => Promise<Page<Data>>
  options?: PaginatedListOption
}


interface UsePaginationListResult<TData> {
  dataList: TData[];
  isLoading: boolean;
  isError: boolean | null;
  refresh: () => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

export function usePaginationList<Data>({ queryKey, getList, options }: IUsePaginationList<Data>): UsePaginationListResult<Data> {
  const [dataList, setDataList] = useState<Data[]>([]);

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => getList({ page: pageParam, per_page: 10 }),
    getNextPageParam: (lastPage: Page<Data>) => {
      return lastPage.meta.hasNextPage ? lastPage.meta.currentPage + 1 : null;
    },
    initialPageParam: 1,
    enabled: options?.enabled,
    staleTime: options?.staleTime,
  });

  useEffect(() => {
    if (query.data) {
      const newList = query.data.pages.reduce<Data[]>((prev, curr) => {
        return [...prev, ...curr.data];
      }, []);
      setDataList(newList);
    }
  }, [query.data]);

  return {
    dataList,
    isLoading: query.isLoading,
    isError: query.isError,
    refresh: query.refetch,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: !!query.hasNextPage,
  };
}
