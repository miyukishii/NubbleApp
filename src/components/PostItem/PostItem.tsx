import React from 'react';

import { Box } from '../../components/UI/Box/Box';
import { Post } from '../../domain/Post/postTypes';
import { ProfileUser } from '../ProfileUser/ProfileUser';

import { PostActions } from './components/PostActions';
import { PostBottom } from './components/PostBottom';
import { PostImage } from './components/PostImage';

export function PostItem({ item, hideCommentActions }: {item: Post, hideCommentActions: boolean}): React.JSX.Element {
  const author = {
    profileUrl: item.author.profileURL,
    id: Number(item.author.id),
    username: item.author.userName,
  };
  return (
    <Box paddingHorizontal="s20" marginBottom="s24">
      <ProfileUser user={author} />
      <PostImage imageURL={item.imageURL} />
      <PostActions hideCommentActions={hideCommentActions} post={item} />
      <PostBottom hideCommentActions={hideCommentActions} author={item.author} text={item.text} commentCount={item.commentCount} id={item.id} />
    </Box>
  );
}
