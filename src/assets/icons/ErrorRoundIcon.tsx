import { Svg, Path, Circle } from 'react-native-svg';

import { IconBaseProps } from '../../components/Icon/Icon';
import { theme } from '../../theme/theme';

export function ErrorRoundIcon({ size, color }: IconBaseProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill={theme.colors.grayWhite}>
      <Circle cx="24" cy="24" r="24" fill={color} />
      <Path fillRule="evenodd" clipRule="evenodd" d="M15 15.0004L31.2279 31.9996M15.7728 32L32 15" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </Svg>
  );
}
