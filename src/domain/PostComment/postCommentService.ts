import { apiAdapter } from '../../api/apiAdapter';
import { Details } from '../../api/apiTypes';
import { Page } from '../../types/pages';

import { postAdapter } from './postCommentAdapter';
import { ICreateParams, IGetListParams, postCommentApi } from './postCommentApi';
import { PostComment } from './postCommentTypes';


async function getList(params: IGetListParams): Promise<Page<PostComment>> {
  const postPageApi = await postCommentApi.getList(params);
  return apiAdapter.toPageModel(postPageApi, postAdapter.toPostComment);
}

async function create(params: ICreateParams): Promise<PostComment> {
  const newComment = await postCommentApi.create(params);
  return postAdapter.toPostComment(newComment)
  ;
}

async function remove(commentId: number): Promise<Details> {
  const details = await postCommentApi.remove(commentId);
  return details
  ;
}

function isAllowToDelete(
  {
    userId,
    postAuthorId,
    commentAuthorId,
  }: {
    userId: number,
    postAuthorId: number,
    commentAuthorId: number,
  }
): boolean {
  if (userId === postAuthorId) {return true;}
  if (userId === commentAuthorId) {return true;}
  return false;
}

export const postCommentService = {
  getList,
  create,
  remove,
  isAllowToDelete,
};
