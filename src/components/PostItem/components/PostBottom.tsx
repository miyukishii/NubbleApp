import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Post } from 'src/domain/Post/postTypes';

import { Box } from '../../UI/Box/Box';
import { TouchbleOpacityBox } from '../../UI/Box/TouchbleOpacityBox';
import { Text } from '../../UI/Text/Text';

export function PostBottom({ author, text, commentCount, id, hideCommentActions = false }: Pick<Post, 'author'| 'text' | 'commentCount' | 'id' > & { hideCommentActions?: boolean }): React.JSX.Element {
  const navigation = useNavigation();

  const navigateToPostCommentScreen = (): void => {
    navigation.navigate('PostCommentScreen', {
      postId: id,
      showPost: false,
    });
  };

  return (
    <Box
      marginTop="s16"
    >
      <Text bold preset="paragraphMedium">{author.userName}</Text>
      <Text preset="paragraphMedium" color="gray1" marginBottom={commentCount === 0 ? 's16' : undefined}>{text}</Text>
      {
        !hideCommentActions && commentCount > 0 && (
          <TouchbleOpacityBox marginTop="s8" onPress={navigateToPostCommentScreen}>
            <Text color='primary' bold preset="paragraphSmall">ver {commentCount} comentários</Text>
          </TouchbleOpacityBox>
        )
      }
    </Box>
  );
}
