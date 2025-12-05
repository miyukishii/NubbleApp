import React from 'react';
import { Toast, ToastType } from '../../../services/toast/toastTypes';
import { $shadowProps } from '../../../theme/theme';
import { Icon, IconProps } from '../../Icon/Icon';
import { Box, BoxProps } from '../../UI/Box/Box';
import { Text } from '../../UI/Text/Text';


export function ToastUI({ toast }: {toast: Toast}): React.JSX.Element | null {
  const type: ToastType = toast.type || 'success';

  const mapToastType: Record<ToastType, IconProps> = {
    success: {
      name: 'checkRound',
      color: 'success',
    },
    error: {
      name: 'errorRound',
      color: 'redError',
    },
  };

  return (
    <Box {...$boxStyled}>
      <Icon
        name={mapToastType[type].name}
        color={mapToastType[type].color}
      />
      <Text style={{ flexShrink: 1 }} preset="paragraphMedium" bold>{toast.message}</Text>
    </Box>
  );
}

const $boxStyled: BoxProps = {
  gap: 's16',
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: 'r16',
  padding: 's16',
  backgroundColor: 'background',
  opacity: 0.95,
  style: { ...$shadowProps },
};
