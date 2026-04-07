import { PageAPI, PageParams } from 'src/api/apiTypes';

import { api } from '../../api/apiConfig';

import { PostReactionAPI, PostReactionBaseAPI, PostReactionType } from './postReactionTypes';

const PATH = 'user/reactions';

export type IMyReactionsParams = PageParams & {
  post_id?: number;
  reaction_type?: PostReactionType;
}

async function getUserReactions(params: IMyReactionsParams): Promise<PageAPI<PostReactionAPI>> {
  const response = await api.get<PageAPI<PostReactionAPI>>(
    `${PATH}/my-reactions`,
    { params }
  );
  return response.data;
}

export interface IPostReaction {
  post_id: number,
  reaction_type?: PostReactionType;
}

async function createOrUpdateReaction({ post_id, reaction_type }: IPostReaction): Promise<PostReactionBaseAPI> {
  const response = await api.post<PostReactionAPI>(
    `${PATH}/${post_id}/${reaction_type}`,
  );
  return response.data;
}

export const postReactionApi = {
  getUserReactions,
  createOrUpdateReaction,
};
