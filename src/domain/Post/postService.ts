import { apiAdapter } from '../../api/apiAdapter';
import { PageParams } from '../../api/apiTypes';
import { Page } from '../../types/pages';

import { postAdapter } from './postAdapter';
import { postApi } from './postApi';
import { ICreatePostParams, Post } from './postTypes';

async function getList(params: PageParams): Promise<Page<Post>> {
  const postPageApi = await postApi.getList(params);
  return apiAdapter.toPageModel(postPageApi, postAdapter.toPost);
}

async function create(params: ICreatePostParams): Promise<Post> {
  const newPost = await postApi.create(params);
  return postAdapter.toPost(newPost);
}

async function getById(postId: number): Promise<Post> {
  const post = await postApi.getById(postId);
  return postAdapter.toPost(post);
}

export const postService = {
  getList,
  create,
  getById,
};
