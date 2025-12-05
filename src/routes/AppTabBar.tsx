import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { Icon } from '../components/Icon/Icon';
import { Box } from '../components/UI/Box/Box';
import { TouchbleOpacityBox } from '../components/UI/Box/TouchbleOpacityBox';
import { Text } from '../components/UI/Text/Text';
import { useAppSafeArea } from '../hooks/useAppSafeArea';
import { $shadowProps } from '../theme/theme';

import { AppBottomTabParamList } from './AppTabNavigator';
import { mapScreenToProps } from './mapScreenToProps';

export function AppTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { bottom } = useAppSafeArea();

  return (
    <Box
      flexDirection="row"
      paddingTop="s12"
      backgroundColor="background"
      style={[{ paddingBottom: bottom }, $shadowProps]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const tabItem = mapScreenToProps[route.name as keyof AppBottomTabParamList];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchbleOpacityBox
            key={route.key}
            activeOpacity={1}
            alignItems="center"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Icon name={isFocused ? tabItem.icon.focused : tabItem.icon.unFocused} color={isFocused ? 'primary' : 'backgroundConstrast'} />
            <Text marginTop="s4" semibold preset="paragraphCaption" color={isFocused ? 'primary' : 'backgroundConstrast'}>{tabItem.label}</Text>
          </TouchbleOpacityBox>
        );
      })}
    </Box>
  );
}
