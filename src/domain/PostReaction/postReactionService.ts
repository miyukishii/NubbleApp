import { apiAdapter } from '../../api/apiAdapter';
import { Page } from '../../types/pages';

import { postReactionAdapter } from './postReactionAdapter';
import { IMyReactionsParams, IPostReaction, postReactionApi } from './postReactionApi';
import { PostReaction, PostReactionBase, PostReactionType } from './postReactionTypes';

async function getUserReactions(params: IMyReactionsParams): Promise<Page<PostReaction>> {
  const postReactionPageAPI = await postReactionApi.getUserReactions(params);
  return apiAdapter.toPageModel(postReactionPageAPI, postReactionAdapter.toPostReaction);
}

async function reactToPost(params: IPostReaction): Promise<PostReactionBase> {
  const reactionBaseAPI = await postReactionApi.createOrUpdateReaction(params);
  return postReactionAdapter.toPostReactionBase(reactionBaseAPI)
  ;
}

function hasReactedToPost(postReaction: Pick<PostReaction, 'emojiType'>[], postReactionType:PostReactionType) {
  return postReaction.some(reaction => reaction.emojiType === postReactionType)
}

export const postReactionService = {
  getUserReactions,
  reactToPost, hasReactedToPost
};
