import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { QueryKeys } from '../../types/infraTypes';

import { cameraRollService } from './cameraRollService';

export function useCameraRoll(hasPermission: boolean, onInitialLoad?: (imageUri: string) => void,) {
  const [list, setList] = useState<string[]>([]);

  const query = useInfiniteQuery({
    queryKey: [QueryKeys.CameraRollList],
    queryFn: ({ pageParam }) => cameraRollService.getPhotos(pageParam),
    getNextPageParam: ({ cursor }) => cursor,
    enabled: hasPermission,
    initialPageParam: ''
  });

  const fetchNextPage = () => {
    if (hasPermission) {
      query.fetchNextPage()
    }
  }

  useEffect(() => {
    if (query.data) {
      const newList = query.data.pages.reduce<string[]>((prev, curr) => {
        return [...prev, ...curr.photoList];
      }, []);
      setList(newList);

      if (query.data.pages.length === 1 && onInitialLoad) {
        onInitialLoad(newList[0]);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data]);

  return {
    photoList: list,
    hasNextPage: query.hasNextPage,
    fetchNextPage,
  };
}


