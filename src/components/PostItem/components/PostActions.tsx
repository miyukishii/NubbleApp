import { useNavigation } from '@react-navigation/native';

import { Icon, IconProps } from '../../../components/Icon/Icon';
import { Box } from '../../../components/UI/Box/Box';
import { TouchbleOpacityBox } from '../../../components/UI/Box/TouchbleOpacityBox';
import { Text } from '../../../components/UI/Text/Text';
import { Post } from '../../../domain/Post/postTypes';
import { useReactToPost } from '../../../domain/PostReaction/useCases/useReactToPost';
import { ThemeColors } from '../../../theme/theme';
import { QueryKeys } from '../../../types/infraTypes';

export function PostActions({ post, hideCommentActions = false }: { post: Post, hideCommentActions?: boolean }): React.JSX.Element {
  const navigation = useNavigation();

  const likeReaction = useReactToPost(post, 'like')
  const favReaction = useReactToPost(post, 'favorite', [QueryKeys.FavoriteList])

  const navigateToPostCommentScreen = (): void => {
    navigation.navigate('PostCommentScreen', {
      postId: post.id,
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
        onPress={likeReaction.reactToPost}
        isMarked={likeReaction.reactionState.hasreated}
        markedColor="favorite"
        iconName={{
          default: 'heart',
          marked: 'heartFill',
        }}
        text={likeReaction.reactionState.reactionCount}
      />
      <Item
        onPress={navigateToPostCommentScreen}
        iconName={{
          default: 'comment',
        }}
        disabled={hideCommentActions}
        text={post.commentCount}
      />
      <Item
        onPress={favReaction.reactToPost}
        isMarked={favReaction.reactionState.hasreated}
        markedColor="saved"
        iconName={{
          default: 'bookMark',
          marked: 'bookMarkFill',
        }}
        text={favReaction.reactionState.reactionCount}
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
