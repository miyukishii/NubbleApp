import { useQuery } from '@tanstack/react-query';

import { QueryKeys } from '../../../types/infraTypes';
import { postService } from '../postService';

export function usePostGetById(
  postId: number,
  showPost: boolean
) {

  const { data, isLoading, isError } = useQuery({
    queryKey: [QueryKeys.PostGetById, postId],
    queryFn: () => postService.getById(postId),
    staleTime: 1000 * 30,
    enabled: showPost
  });

  return {
    isLoading,
    postData: data,
    error: isError,
  };
}

