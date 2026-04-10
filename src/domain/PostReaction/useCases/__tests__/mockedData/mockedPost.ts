import { PostReactionBase } from '../../../../../domain/PostReaction/postReactionTypes';
import { Post } from '../../../../Post/postTypes';

const postWithoutLike: Post = {
  id: '1',
  text: 'text test',
  author: {
    id: 1,
    profileURL: 'fake-url',
    name: 'test',
    userName: 'test',
  },
  imageURL: 'fake-url',
  reactionCount: 2,
  commentCount: 3,
  favoriteCount: 3,
  reactions: [],
};

const postWithoutLikeResponse: PostReactionBase = {
  id: 4,
  emojiType: 'like',
  postId: Number(postWithoutLike.id),
  userId: 2,
  createdAt: '2021-08-01T00:00:00z',
  updatedAt: '2021-08-01T00:00:00z',
  isChecked: true,
}

export const mockedWithoutLike = {
  post: postWithoutLike,
  response: postWithoutLikeResponse
}

const postWithLike: Post = {
  ...postWithoutLike,
  reactions: [
    {
      emojiType: 'like',
      postId: Number(postWithoutLike.id),
    },
  ],
};

const postWithLikeResponse: PostReactionBase = {
  ...postWithoutLikeResponse,
  isChecked: false,
}

export const mockedWithLike = {
  post: postWithLike,
  response: postWithLikeResponse
}
