import { AppScreenProps, } from '../../../routes/navigationType';
import { Dimensions, StyleSheet } from 'react-native';
import { Box, BoxProps } from '../../../components/UI/Box/Box';
import { Icon } from '../../../components/Icon/Icon';
import { useAppSafeArea } from '../../../hooks/useAppSafeArea';
import { useRef, useState } from 'react';
import { PermissionManager } from '../../../components/PermissionManager/PermissionManager';
import { Camera, Templates, useCameraDevice, useCameraFormat } from 'react-native-vision-camera'
import { useIsFocused } from '@react-navigation/native';
import { useAppState } from '../../../hooks/useAppState';

const CAMERA_VIEW = Dimensions.get('screen').width;
const CONTROL_HEIGHT = (Dimensions.get('screen').height - CAMERA_VIEW) / 2;
const CONTROL_DIFF = 30;

export function CameraScreen({ navigation }: AppScreenProps<'CameraScreen'>) {
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const { top } = useAppSafeArea()
  const device = useCameraDevice('back', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera'
    ]
  })
  const format = useCameraFormat(device, Templates.Instagram);
  const isFocused = useIsFocused();
  const { appState } = useAppState();

  const isActive = isFocused && appState === 'active'

  const camera = useRef<Camera>(null)

  const takePhoto = async () => {
    if (!camera.current) return;
    const photoFile = await camera.current.takePhoto(
      { flash: isFlashOn ? 'on' : 'off' }
    );
    navigation.navigate('PublishPostScreen', {
      imageUri: `file://${photoFile.path}`
    })
  }

  const toggleFlash = (): void => setIsFlashOn(!isFlashOn);

  return (
    <PermissionManager
      permissionType='camera'
      description='Permita o Nubble acessar a câmera'
    >
      <Box flex={1}>
        <Box backgroundColor='grayWhite' style={StyleSheet.absoluteFill} />
        {device &&
          <Camera
            photoQualityBalance='quality'
            ref={camera}
            format={format}
            device={device}
            isActive={isActive}
            style={StyleSheet.absoluteFill}
            photo={true}
            onInitialized={() => setIsReady(true)}
          />
        }
        <Box flex={1} justifyContent='space-between'>
          <Box {...$StyledUpBox} style={{ paddingTop: top }}>
            <Icon name='arrowLeft' color='grayWhite' onPress={navigation.goBack} />
            <Icon
              name={isFlashOn ? 'flashOn' : 'flashOff'}
              color='grayWhite'
              onPress={toggleFlash}
            />
            <Box width={20} />
          </Box>
          <Box {...$StyledBottomBox}>
            {isReady && (
              <Icon name='cameraClick' color='grayWhite' size={80} onPress={takePhoto} />
            )}
          </Box>
        </Box>
      </Box>
    </PermissionManager>
  );
}

const $StyledUpBox: BoxProps = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  height: CONTROL_HEIGHT - CONTROL_DIFF,
  paddingHorizontal: 's24',
  backgroundColor: 'black60'
};

const $StyledBottomBox: BoxProps = {
  justifyContent: 'center',
  alignItems: 'center',
  height: CONTROL_HEIGHT + CONTROL_DIFF,
  backgroundColor: 'black60'
};

