import { Dimensions, Image } from 'react-native';

import { PageItem } from './onboardingData';
import { useAppColor } from '../../../../services/settings/useSettings';

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
