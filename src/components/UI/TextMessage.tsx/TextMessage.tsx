import React, { useRef } from 'react';
import { Pressable, TextInput, TextInputProps } from 'react-native';

import { useTheme } from '@shopify/restyle';

import { Theme } from '../../../theme/theme';
import { ActivityIndicator } from '../ActivityIndicator/ActivityIndicator';
import { Box } from '../Box/Box';
import { TouchbleOpacityBox } from '../Box/TouchbleOpacityBox';
import { Text } from '../Text/Text';

interface TextMessageProps extends TextInputProps {
  placeholder: string;
  value: string;
  onPressSend: () => void;
  loading: boolean;
}

export function TextMessage({
  placeholder,
  onPressSend,
  loading,
  value,
  ...textInputProps}: TextMessageProps): React.JSX.Element {
  const {colors} = useTheme<Theme>();
  const inputRef = useRef<TextInput>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const sendIsDisabled = value.trim().length === 0;

  return (
    <Pressable onPress={focusInput}>
      <Box paddingHorizontal="s16" paddingVertical="s14" backgroundColor="gray5" borderRadius="r12" flexDirection="row" alignItems="center" justifyContent="space-between">
        <TextInput
          ref={inputRef}
          value={value}
          autoCapitalize="none"
          placeholderTextColor={colors.gray2}
          placeholder={placeholder}
          style={{ padding: 0 }}
          {...textInputProps}
        />
        <TouchbleOpacityBox onPress={onPressSend} disabled={sendIsDisabled || loading}>
          {loading ?
            (<ActivityIndicator color="primary" />)
            : (<Text color={sendIsDisabled ? 'gray2' : 'primary'} bold>
            Enviar
            </Text>
            )}
        </TouchbleOpacityBox>
      </Box>
    </Pressable>
  );
}
