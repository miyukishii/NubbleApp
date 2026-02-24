import { Button } from '../../../../components/UI/Button/Button';
import { Box, BoxProps } from '../../../../components/UI/Box/Box';
import { ImageBackground, ViewStyle, } from 'react-native';
import { Text } from '../../../../components/UI/Text/Text';
import { Icon } from '../../../../components/Icon/Icon';
import { useNavigation } from '@react-navigation/native';
import { images } from './../../../../assets';



interface Props {
  selectedImageUri?: string;
  imageWidth: number;
}

export function Header({ selectedImageUri, imageWidth }: Props) {
  const navigation = useNavigation();

  const navigateToPublishScreen = (): void => {
    if (!selectedImageUri) return;
    navigation.navigate('PublishPostScreen', {
      imageUri: selectedImageUri
    });
  };
  const navigateToCameraScreen = (): void => {
    navigation.navigate('CameraScreen');
  };

  return (
    <Box>
      <ImageBackground
        source={selectedImageUri ? { uri: selectedImageUri } : images.imagePlaceholder}
        style={[
          $StyledImageBackground,
          {
            width: imageWidth,
            height: imageWidth,
          }
        ]}
      >
        {Boolean(selectedImageUri) && (
          <Button
            preset='ghost'
            title='Escolher essa'
            disabled={!selectedImageUri}
            onPress={navigateToPublishScreen}
          />
        )}
      </ImageBackground>
      <Box {...$StyledBox}>
        <Text
          preset='headingSmall'
          bold
        >
          Sua galeria
        </Text>
        <Icon name='camera' onPress={navigateToCameraScreen} />
      </Box>
    </Box>
  );
}

const $StyledImageBackground: ViewStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingBottom: 24,
};

const $StyledBox: BoxProps = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 's32',
  marginBottom: 's16',
  marginHorizontal: 's24'
};

