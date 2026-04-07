import { cloneDeep } from 'lodash';
import { http, HttpResponse, PathParams } from 'msw';

import { BASE_URL } from '../../../api/apiConfig';
import { PageAPI } from '../../../api/apiTypes';
import { POST_COMMENT_PATH } from '../../../domain/PostComment/postCommentApi';
import { PostCommentAPI } from '../../../domain/PostComment/postCommentTypes';

import { mockedData } from './mocks';

const FULL_URL = `${BASE_URL}${POST_COMMENT_PATH}`

let inMemoryResponse = cloneDeep(mockedData.mockedPostCommentResponse)

export function resetInMemoryResponse() {
  inMemoryResponse = cloneDeep(mockedData.mockedPostCommentResponse)
}

export const postCommentHandlers = [
  http.get(FULL_URL, async () => {
    const response: PageAPI<PostCommentAPI> = inMemoryResponse;

    return HttpResponse.json(response, { status: 200 })
  }),

  http.post<PathParams, {post_id: number; message: string}>(
    FULL_URL,
    async ({ request }) => {
      const body = await request.json();

      const newPostCommentAPI: PostCommentAPI = {
        ...mockedData.postCommentAPI,
        id: 999,
        post_id: body.post_id,
        message: body.message,
      };

      inMemoryResponse.data = [newPostCommentAPI, ...inMemoryResponse.data];
      inMemoryResponse.meta = {
        ...inMemoryResponse.meta,
        total: inMemoryResponse.meta.total + 1,
      };

      return HttpResponse.json(newPostCommentAPI, { status: 201 });
    },
  ),

  http.delete<{commentId: string}>(
    `${FULL_URL}/:commentId`,
    async ({ params }) => {
      const commentId = params.commentId

      inMemoryResponse.data = inMemoryResponse.data.filter((item) =>item.id.toString() !== commentId);
      inMemoryResponse.meta = {
        ...inMemoryResponse.meta,
        total: inMemoryResponse.meta.total - 1,
      };

      return HttpResponse.json({
        message: 'removed' },
      { status: 200 }
      )
    },
  ),
]
