import { api } from '../../api/apiConfig';
import { PageAPI, PageParams } from '../../api/apiTypes';

import { ICreatePostParams, PostAPI } from './postTypes';

const PATH = 'user/post';

async function getList(params: PageParams): Promise<PageAPI<PostAPI>> {
  const response = await api.get<PageAPI<PostAPI>>(
    PATH,
    { params }
  );
  return response.data;
}

async function create(params: ICreatePostParams): Promise<PostAPI> {
  const form = new FormData();
  form.append('text', params.text);
  form.append('imageCover', params.imageCover);

  const response = await api.postForm<PostAPI>(PATH, form);
  return response.data;
}

export const postApi = {
  getList,
  create
};
