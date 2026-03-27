import { userAdapter } from "../Users/userAdapter";

import { PostReaction, PostReactionAPI, PostReactionBase, PostReactionBaseAPI } from "./postReactionTypes";

function toPostReactionBase(postReactionBaseAPI: PostReactionBaseAPI): PostReactionBase {
  return {
    id: postReactionBaseAPI.id,
    emojiType: postReactionBaseAPI.emoji_type,
    userId: postReactionBaseAPI.user_id,
    postId: postReactionBaseAPI.post_id,
    isChecked: postReactionBaseAPI.is_checked,
    createdAt: postReactionBaseAPI.created_at,
    updatedAt: postReactionBaseAPI.updated_at
  };
}

function toPostReaction(postReactionAPI: PostReactionAPI): PostReaction {
  return {
    ...toPostReactionBase(postReactionAPI),
    author: userAdapter.toUser(postReactionAPI.user),
    post: {
      id: postReactionAPI.post.id.toString(),
      text: postReactionAPI.post.text,
      imageURL: postReactionAPI.post.image_url,
    },
  };
}

export const postReactionAdapter = {
  toPostReaction,
  toPostReactionBase
};
