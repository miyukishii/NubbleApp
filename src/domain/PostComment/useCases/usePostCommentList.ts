import { PageParams } from '../../../api/apiTypes';
import { usePaginationList } from '../../../hooks/usePaginationList';
import { QueryKeys } from '../../../types/infraTypes';
import { postCommentService } from '../postCommentService';
import { PostComment } from '../postCommentTypes';

export function usePostCommentList(postId: number) {
  const getList = (pageParams: PageParams) => {
    return postCommentService.getList({ post_id: postId, pageParams });
  };
  return usePaginationList<PostComment>({ getList, queryKey: [QueryKeys.PostCommentList, postId] });
}
