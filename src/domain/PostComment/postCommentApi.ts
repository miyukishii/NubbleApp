import { api } from '../../api/apiConfig';
import { Details, PageAPI, PageParams } from '../../api/apiTypes';

import { PostCommentAPI } from './postCommentTypes';

const PATH = 'user/post_comment';
export interface IGetListParams {
  pageParams: PageParams,
  post_id: number;
}

async function getList({ pageParams, post_id }: IGetListParams): Promise<PageAPI<PostCommentAPI>> {
  const response = await api.get<PageAPI<PostCommentAPI>>(
    PATH,
    { params: {
      post_id,
      ...pageParams,
    } }
  );
  return response.data;
}

export interface ICreateParams {
  message: string,
  post_id: number;
}

async function create(data: ICreateParams): Promise<PostCommentAPI> {
  const response = await api.post<PostCommentAPI>(
    PATH,
    data
  );
  return response.data;
}

async function remove(commentId: number): Promise<Details> {
  const response = await api.delete<Details>(
    `${PATH}/${commentId}`,
  );
  return response.data;
}

export const postCommentApi = {
  getList,
  create,
  remove,
};
