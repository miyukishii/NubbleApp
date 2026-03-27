import { apiAdapter } from '../../api/apiAdapter';
import { Page } from '../../types/pages';
import { postReactionAdapter } from './postReactionAdapter';
import { IMyReactionsParams, IPostReaction, postReactionApi } from './postReactionApi';
import { PostReaction, PostReactionBase } from './postReactionTypes';

async function getUserReactions(params: IMyReactionsParams): Promise<Page<PostReaction>> {
  const postReactionPageAPI = await postReactionApi.getUserReactions(params);
  return apiAdapter.toPageModel(postReactionPageAPI, postReactionAdapter.toPostReaction);
}

async function reactToPost(params: IPostReaction): Promise<PostReactionBase> {
  const reactionBaseAPI = await postReactionApi.createOrUpdateReaction(params);
  return postReactionAdapter.toPostReactionBase(reactionBaseAPI)
  ;
}

export const postReactionService = {
  getUserReactions,
  reactToPost,
};
