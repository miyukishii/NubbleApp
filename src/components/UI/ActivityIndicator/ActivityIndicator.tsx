import {
  ActivityIndicator as RNActivityIndicator,
  ActivityIndicatorProps as RNActivityIndicatorProps,
} from 'react-native';

import { useAppTheme } from '../../../hooks/useAppTheme';
import { ThemeColors } from '../../../theme/theme';

interface ActivityIndicatorProps extends Omit<RNActivityIndicatorProps, 'color'> {
  color?: ThemeColors;
}

export function ActivityIndicator({ color = 'primary', ...rest }: ActivityIndicatorProps) {
  const { colors } = useAppTheme();
  return <RNActivityIndicator testID="activity-indicator" color={colors[color]} {...rest} />;
}
