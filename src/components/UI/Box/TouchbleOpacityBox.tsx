import {
  createRestyleComponent,
  backgroundColor,
  BackgroundColorProps,
  spacing,
  SpacingProps,
  layout,
  LayoutProps,
  border,
  BorderProps,
  spacingShorthand,
  SpacingShorthandProps,
} from '@shopify/restyle';
import { TouchableOpacity, TouchableOpacityProps, Pressable, PressableProps } from 'react-native';


import { Theme } from '../../../theme/theme';

type RestyleTypes = BackgroundColorProps<Theme> &
SpacingProps<Theme> &
LayoutProps<Theme> &
BorderProps<Theme> &
SpacingShorthandProps<Theme>;

export type TouchbleOpacityBoxProps =
TouchableOpacityProps & RestyleTypes;

export const TouchbleOpacityBox = createRestyleComponent<TouchbleOpacityBoxProps, Theme>([backgroundColor, spacing, spacingShorthand, layout, border], TouchableOpacity);

export type PressableBoxProps =
PressableProps & RestyleTypes;

export const PressableBox = createRestyleComponent<PressableBoxProps, Theme>([backgroundColor, spacing, spacingShorthand, layout, border], Pressable);
