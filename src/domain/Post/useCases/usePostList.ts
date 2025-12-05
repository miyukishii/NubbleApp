import { usePaginationList } from '../../../hooks/usePaginationList';
import { postService } from '../postService';
import { Post } from '../postTypes';

import { QueryKeys } from './../../../types/infraTypes';

export function usePostList() {
  return usePaginationList<Post>({ getList: postService.getList, queryKey: [QueryKeys.PostList] });
}
