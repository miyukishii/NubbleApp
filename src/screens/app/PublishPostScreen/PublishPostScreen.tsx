import { Screen } from '../../../components/Screen/Screen';
import { AppScreenProps } from '../../../routes/navigationType';
import { Button } from '../../../components/UI/Button/Button';
import { Dimensions, Image, ImageStyle } from 'react-native';
import { Box, BoxProps } from '../../../components/UI/Box/Box';

import { Theme } from '../../../theme/theme';
import { useTheme } from '@shopify/restyle';
import { Text } from '../../../components/UI/Text/Text';
import { usePostCreate } from '../../../domain/Post/useCases/usePostCreate';

import { Multiline } from '../../../components/UI/Multiline/TextField';
import { useState } from 'react';

const IMAGE_WIDTH = Dimensions.get('screen').width / 2;

export function PublishPostScreen({ route }: AppScreenProps<'PublishPostScreen'>) {
  const [description, setDescription] = useState('');

  const imageUri = route.params.imageUri;

  const { colors } = useTheme<Theme>();
  const {
    handleSubmit,
    isLoading: submitLoading,
  } = usePostCreate();

  const publishPost = (): void => {
    handleSubmit({
      description, imageUri
    })
  }

  return (
    <Screen
      canGoBack
      showGoBack={false}
      title='Novo post'
    >
      <Box {...$StyledBox}>
        <Image
          source={{ uri: imageUri }}
          style={[
            $StyledImage,
          ]}
        />
      </Box>
      <Box>
        <Text bold preset='headingSmall'>
        Escreva uma legenda
        </Text>
        <Multiline
          value={description}
          onChangeText={setDescription}
          autoCapitalize="none"
          placeholderTextColor={colors.gray1}
          placeholder='Digite aqui...'
          numberOfLines={4}
          containerProps={{
            borderWidth: 0
          }}
        />
      </Box>
      <Button
        title='Publicar post'
        style={{ marginTop: 64 }}
        onPress={publishPost}
        loading={submitLoading}
        disabled={submitLoading}
      />
    </Screen>
  );
}

const $StyledImage: ImageStyle = {
  width: IMAGE_WIDTH,
  height: IMAGE_WIDTH,
};
const $StyledBox: BoxProps = {
  alignItems: 'center',
  marginBottom: 's32'
};
