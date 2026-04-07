import { ActivityIndicator } from '../ActivityIndicator/ActivityIndicator';
import { TouchbleOpacityBox, TouchbleOpacityBoxProps } from '../Box/TouchbleOpacityBox';
import { Text } from '../Text/Text';

import { buttonPresets } from './ButtonPresets';

export type ButtonVariants = 'primary' | 'outline' | 'ghost';

interface ButtonProps extends TouchbleOpacityBoxProps {
  preset?: ButtonVariants;
  title: string;
  loading?: boolean;
  disabled?: boolean;
}

export function Button({
  title,
  loading,
  preset = 'primary',
  disabled,
  ...touchbleOpacityBoxProps
}: ButtonProps) {
  const buttonPreset = buttonPresets[preset][disabled ? 'disabled' : 'default'];
  return (
    <TouchbleOpacityBox
      disabled={disabled || loading}
      paddingHorizontal="s20"
      height={50}
      alignItems="center"
      justifyContent="center"
      borderRadius="r16"
      testID="button-component"
      {...touchbleOpacityBoxProps}
      {...buttonPreset.container}
    >
      {loading ? (
        <ActivityIndicator color={buttonPreset.content} />
      ) : (
        <Text preset="paragraphMedium" bold color={buttonPreset.content}>
          {title}
        </Text>
      )}
    </TouchbleOpacityBox>
  );
}
