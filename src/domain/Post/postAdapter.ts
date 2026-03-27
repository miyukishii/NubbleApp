import { Post, PostAPI } from './postTypes';

function toPost(postApi: PostAPI): Post {
  return {
    id: postApi.id.toString(),
    text: postApi.text,
    author: {
      id: postApi.user.id,
      profileURL: postApi.user.profile_url,
      name: postApi.user.full_name,
      userName: postApi.user.username,
    },
    imageURL: postApi.image_url,
    reactionCount: parseInt(postApi.meta.like_count, 10),
    commentCount: parseInt(postApi.meta.comments_count, 10),
    favoriteCount: parseInt(postApi.meta.favorite_count, 10),
    reactions: postApi.reactions.map((reaction) => ({
      emojiType: reaction.emoji_type,
      postId: reaction.post_id
    }))
  };
}

export const postAdapter = {
  toPost,
};
