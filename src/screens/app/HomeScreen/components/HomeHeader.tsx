import { useNavigation } from '@react-navigation/native';

import { LogoSimple } from '../../../..//assets/brand/LogoSimple';
import { Icon } from '../../../../components/Icon/Icon';
import { Box, BoxProps } from '../../../../components/UI/Box/Box';
import { useAppSafeArea } from '../../../../hooks/useAppSafeArea';

export function HomeHeader() {
  const { top } = useAppSafeArea();
  const navigation = useNavigation();

  const navigateToSearchScreen = (): void => {
    navigation.navigate('SearchScreen');
  };

  return (
    <Box
      {...$StyledBox}
      style={{ paddingTop: top }}
    >
      <LogoSimple width={70} />
      <Box flexDirection="row" gap="s24">
        <Icon name="search" onPress={navigateToSearchScreen} />
        <Icon name="bellOn" />
        <Icon name="chatOn" />
      </Box>
    </Box>
  );
}

const $StyledBox: BoxProps = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 's24',
  paddingBottom: 's24',
};
