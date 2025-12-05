
import React from 'react';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { FavoritesScreen } from '../screens/app/FavoritesScreen/FavoritesScreen';
import { HomeScreen } from '../screens/app/HomeScreen/HomeScreen';
import { MyProfileScreen } from '../screens/app/MyProfileScreen/MyProfileScreen';
import { NewPostScreen } from '../screens/app/NewPostScreen/NewPostScreen';

import { AppTabBar } from './AppTabBar';

export type AppBottomTabParamList = {
  HomeScreen: undefined;
  NewPostScreen: undefined;
  FavoritesScreen: undefined;
  MyProfileScreen: undefined;

}

const Tab = createBottomTabNavigator<AppBottomTabParamList>();

export function AppTabNavigator() {

  const renderTabBar = (props: BottomTabBarProps): React.JSX.Element => {
    return <AppTabBar {...props} />;
  };

  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="NewPostScreen" component={NewPostScreen} />
      <Tab.Screen name="FavoritesScreen" component={FavoritesScreen} />
      <Tab.Screen name="MyProfileScreen" component={MyProfileScreen} />
    </Tab.Navigator>
  );
}
