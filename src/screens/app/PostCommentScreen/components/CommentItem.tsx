import React from 'react';
import { Alert, Pressable } from 'react-native';

import { ProfileAvatar } from '../../../../components/ProfileAvatar/ProfileAvatar';
import { Box } from '../../../../components/UI/Box/Box';
import { Text } from '../../../../components/UI/Text/Text';
import { postCommentService } from '../../../../domain/PostComment/postCommentService';
import { PostComment } from '../../../../domain/PostComment/postCommentTypes';
import { usePostCommentRemove } from '../../../../domain/PostComment/useCases/usePostCommentRemove';
import { useAuthCredentials } from '../../../../services/authCredentials/useAuthCredentials';
import { dateUtils } from '../../../../utils/dateUtils';

export function CommentItem({
  item,
  postId,
}: {
  item: PostComment;
  postId: number;
}): React.JSX.Element {
  const { handleRemove } = usePostCommentRemove(item.id, postId);
  const { userId } = useAuthCredentials();

  const isAllowedToRemove = postCommentService.isAllowToDelete({
    commentAuthorId: item.author.id,
    postAuthorId: item.postAuhtorId,
    userId,
  });

  const confirmRemove = (): void => {
    Alert.alert('Deseja excluir o comentário?', 'pressionar confirmar', [
      {
        text: 'Confirmar',
        onPress: handleRemove,
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);
  };

  return (
    <Pressable testID="post-comment-id" disabled={!isAllowedToRemove} onLongPress={confirmRemove}>
      <Box paddingHorizontal="s24" marginBottom="s16" flexDirection="row" alignItems="center">
        <ProfileAvatar
          imageUrl={item.author.profileURL}
          userId={item.author.id}
          navigateToProfile
        />
        <Box ml="s12" flex={1}>
          <Text bold preset="paragraphSmall">
            {item.author.username}
          </Text>
          <Text preset="paragraphSmall" color="paragraph">
            {item.message} - {dateUtils.formatRelative(item.createdAt)}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
}
