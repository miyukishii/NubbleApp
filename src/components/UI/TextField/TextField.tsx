import React, { useRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { useTheme } from '@shopify/restyle';

import { Theme } from '../../../theme/theme';
import { Box, BoxProps } from '../Box/Box';
import { PressableBox } from '../Box/TouchbleOpacityBox';
import { $fontFamily, Text } from '../Text/Text';

import { $TextFieldContainer } from './styles';

export interface TextFieldProps extends TextInputProps {
  label?: string;
  placeholder: string;
  errorMessage?: string;
  RightComponent?: React.ReactElement;
  LeftComponent?: React.ReactElement;
  boxProps?: BoxProps;
}

export function TextField({
  label,
  placeholder,
  errorMessage,
  RightComponent,
  LeftComponent,
  boxProps,
  ...rest
}: TextFieldProps) {
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
        <Box {...$TextFieldContainer({ isError: !!errorMessage })}>
          {LeftComponent}
          <TextInput
            {...rest}
            ref={inputRef}
            autoCapitalize="none"
            placeholderTextColor={colors.gray2}
            placeholder={placeholder}
            style={{ fontFamily: $fontFamily.regular, flex: 1 }}
          />
          {RightComponent}
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
