import { Post } from '../../../../../domain/Post/postTypes';

export const mockedPost: Post = {
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
  reactions: [
    {
      emojiType: 'favorite',
      postId: 2,
    },
  ],
};
