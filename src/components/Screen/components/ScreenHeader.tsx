import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { Icon } from '../../../components/Icon/Icon';
import { Box, BoxProps } from '../../UI/Box/Box';
import { TouchbleOpacityBox } from '../../UI/Box/TouchbleOpacityBox';
import { Text } from '../../UI/Text/Text';
import { ScreenProps } from '../Screen';

type Props = Pick<ScreenProps, 'HeaderComponent'| 'title' | 'showGoBack'>

export function ScreenHeader ({showGoBack, title, HeaderComponent}: Props) {
  const navigation = useNavigation();
  return (
    <Box mb="s24" {...$StyledHeaderBox}>
      <TouchbleOpacityBox onPress={navigation.goBack} flexDirection="row" gap="s8" alignItems="center">
        <Icon name="arrowLeft" color="primary" />
        {
          showGoBack && (
            <Text semibold preset="paragraphMedium">Voltar</Text>
          )
        }
      </TouchbleOpacityBox>
      {title && (
        <>
          <Text preset="headingSmall">{title}</Text>
          <Box width={20} />
        </>
      )}
      {HeaderComponent && (
        <Box flexGrow={1} marginLeft="s8">
          {HeaderComponent}
        </Box>
      )}
    </Box>
  );
}

const $StyledHeaderBox: BoxProps = {
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems: 'center',
};
