import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PostCommentScreen } from '../screens/app/PostCommentScreen/PostCommentScreen';
import { SearchScreen } from '../screens/app/SearchScreen/SearchScreen';
import { SettingsScreen } from '../screens/app/SettingsScreen/SettingsScreen';
import { UserScreen } from '../screens/app/UserScreen/UserScreen';

import { AppBottomTabParamList, AppTabNavigator } from './AppTabNavigator';
import { PublishPostScreen } from '../screens/app/PublishPostScreen/PublishPostScreen';
import { CameraScreen } from '../screens/app/CameraScreen/CameraScreen';
import { DarkModeScrren } from '../screens/app/DarkModeScreen/DarkModeScreen';

export type AppStackParamList = {
  AppTabNavigator: NavigatorScreenParams<AppBottomTabParamList>;
  SettingsScreen: undefined;
  PostCommentScreen: {
    postId: string;
  };
  UserScreen: {
    userId: number;
  };
  SearchScreen: undefined;
  PublishPostScreen:{
    imageUri: string;
  };
  CameraScreen: undefined;
  DarkModeScreen: undefined;
}
const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="AppTabNavigator"
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Screen name="AppTabNavigator" component={AppTabNavigator} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="PostCommentScreen" component={PostCommentScreen} />
      <Stack.Screen name="UserScreen" component={UserScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="PublishPostScreen" component={PublishPostScreen} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      <Stack.Screen name="DarkModeScreen" component={DarkModeScrren} />
    </Stack.Navigator>
  );
}
