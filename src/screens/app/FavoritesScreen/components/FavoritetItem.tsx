import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Text } from '../../../../components/UI/Text/Text';
import { BoxProps } from '../../../../components/UI/Box/Box';
import { PostReaction } from '../../../../domain/PostReaction/postReactionTypes';
import { PressableBox } from '../../../../components/UI/Box/TouchbleOpacityBox';

export function FavoriteItem({ item, imageSize }: {item: PostReaction, imageSize: number}): React.JSX.Element {
  const navigation = useNavigation();

  const navigateToPost = (): void => {
    navigation.navigate('PostCommentScreen', {
      postId: item.author.id.toString(),
      showPost: true,
    })
  }

  return (
    <PressableBox {...$StyledBox} onPress={navigateToPost}>
      <Image
        source={{ uri: item.post.imageURL }}
        style={{ width: imageSize, height: imageSize }}
      />
      <Text semibold>{item.author.username}</Text>
    </PressableBox>
  );
}

const $StyledBox: BoxProps = {
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: 's4'
};
