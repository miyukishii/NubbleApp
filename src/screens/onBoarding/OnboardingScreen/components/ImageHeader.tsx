import { Dimensions, Image } from 'react-native';

import { useAppColor } from '../../../../services/settings/useSettings';

import { PageItem } from './onboardingData';

const SCREEN_WIDTH = Dimensions.get('window').width;

type ImageHeaderProps = {
  image: PageItem['imageHeader']
}

export function ImageHeader({ image } : ImageHeaderProps) {
  const appColor = useAppColor();
  const source = appColor === 'light' ? image.light : image.dark

  return (
    <Image
      source={source}
      style={{
        width: SCREEN_WIDTH, height: '100%'
      }} />
  );
}
