import { useQuery } from '@tanstack/react-query';

import { FieldAvailableAPI } from '../domain/Auth/authTypes';

import { useDebounce } from './useDebounce';

interface UseAvailabilityParams<T extends {length: number}> {
  value: T;
  enabled: boolean;
  debounceMs?: number;
  queryKey: string;
  callback: (value: T) => Promise<FieldAvailableAPI>;
}

export function useAvailability<T extends {length: number}>({ value, enabled, debounceMs, queryKey, callback }: UseAvailabilityParams<T>) {
  const debouncedValue = useDebounce(value, debounceMs);

  const { data, isFetching, isFetched } = useQuery({
    queryKey: [queryKey, debouncedValue],
    queryFn: () => callback(debouncedValue),
    retry: false,
    staleTime: 20000,
    enabled: enabled && debouncedValue.length > 0,
  });

  const isDebouncing = debouncedValue !== value;

  return {
    isAvailable: data?.isAvailable === true,
    isLoading: isFetching || isDebouncing,
    isFetched,
  };

}
