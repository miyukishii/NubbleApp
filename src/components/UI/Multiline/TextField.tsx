import { useRef } from 'react';
import { useTheme } from '@shopify/restyle';
import { TextInput, TextInputProps } from 'react-native';


import { Theme } from '../../../theme/theme';
import { Box, BoxProps } from '../Box/Box';
import { PressableBox } from '../Box/TouchbleOpacityBox';
import { $fontFamily, Text } from '../Text/Text';

import { $TextFieldContainer } from './styles';

export interface MultilineProps extends TextInputProps {
  label?: string;
  placeholder: string;
  errorMessage?: string;
  boxProps?: BoxProps;
  containerProps?:BoxProps;
}

export function Multiline({
  label,
  placeholder,
  errorMessage,
  boxProps,
  containerProps,
  ...rest
}: MultilineProps) {
  const { colors } = useTheme<Theme>();
  const inputRef = useRef<TextInput>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <PressableBox onPress={focusInput}>
      <Box {...boxProps}>
        {label && (
          <Text preset="paragraphMedium" semibold marginBottom="s8">{label}</Text>
        )}
        <Box {...$TextFieldContainer({ isError: !!errorMessage })} {...containerProps}>
          <TextInput
            {...rest}
            ref={inputRef}
            autoCapitalize="none"
            multiline
            placeholderTextColor={colors.gray2}
            placeholder={placeholder}
            style={{ fontFamily: $fontFamily.regular, flex: 1 }}
          />
        </Box>
        {
          errorMessage && (
            <Text preset="paragraphSmall" bold color="error">{errorMessage}</Text>
          )
        }
      </Box>
    </PressableBox>
  );
}
