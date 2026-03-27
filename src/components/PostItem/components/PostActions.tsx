import React, { useState } from 'react';

import { Post } from 'src/domain/Post/postTypes';
import { ThemeColors } from 'src/theme/theme';

import { Icon, IconProps } from '../../../components/Icon/Icon';
import { Box } from '../../../components/UI/Box/Box';
import { TouchbleOpacityBox } from '../../../components/UI/Box/TouchbleOpacityBox';
import { Text } from '../../../components/UI/Text/Text';
import { useNavigation } from '@react-navigation/native';

export function PostActions({ reactionCount, commentCount, favoriteCount, id, hideCommentActions = false }: Pick<Post, 'reactionCount'| 'commentCount' | 'favoriteCount' | 'id'> & { hideCommentActions?: boolean }): React.JSX.Element {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const navigation = useNavigation();

  function likePost(): void {
    setIsLiked(!isLiked);
  }
  function save(): void {
    setIsSaved(!isSaved);
  }
  const navigateToPostCommentScreen = (): void => {
    navigation.navigate('PostCommentScreen', {
      postId: id,
      showPost: false,
    });
  };
  return (
    <Box
      marginTop="s16"
      flexDirection="row"
      alignItems="center"
    >
      <Item
        onPress={likePost}
        isMarked={isLiked}
        markedColor="favorite"
        iconName={{
          default: 'heart',
          marked: 'heartFill',
        }}
        text={reactionCount}
      />
      <Item
        onPress={navigateToPostCommentScreen}
        iconName={{
          default: 'comment',
        }}
        disabled={hideCommentActions}
        text={commentCount}
      />
      <Item
        onPress={save}
        isMarked={isSaved}
        markedColor="saved"
        iconName={{
          default: 'bookMark',
          marked: 'bookMarkFill',
        }}
        text={favoriteCount}
      />
    </Box>
  );
}
interface ItemProps {
  onPress: () => void;
  isMarked?: boolean;
  markedColor?: ThemeColors;
  iconName: {
    default: IconProps['name'];
    marked?: IconProps['name'];
  };
  text: number;
  disabled?: boolean;
}

function Item({
  onPress, isMarked, markedColor, iconName, text, disabled
}: ItemProps) {
  return (
    <TouchbleOpacityBox
      onPress={onPress}
      flexDirection="row"
      alignItems="center"
      mr="s24"
      disabled={disabled}
    >
      <Icon name={isMarked && iconName.marked ? iconName.marked : iconName.default} color={isMarked ? markedColor : undefined} />
      <Text ml="s4" bold preset="paragraphSmall">{text}</Text>
    </TouchbleOpacityBox>
  );
}
