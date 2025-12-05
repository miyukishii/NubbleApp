import { PostComment, PostCommentAPI } from './postCommentTypes';

function toPostComment(postCommentApi: PostCommentAPI): PostComment {
  return {
    id: postCommentApi.id,
    message: postCommentApi.message,
    createdAt: postCommentApi.created_at,
    postAuhtorId: postCommentApi.user.id,
    author: {
      id: postCommentApi.user_id,
      profileURL: postCommentApi.user.profile_url,
      username: postCommentApi.user.username,
    },
  };
}

export const postAdapter = {
  toPostComment,
};
