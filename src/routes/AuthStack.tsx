import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { IconProps } from '../components/Icon/Icon';
import { LoginScreen } from '../screens/auth/LoginScreen/LoginScreen';

export type AuthStackParamList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
  SuccessScreen: {
    title: string;
    description: string;
    buttonText: string;
    icon: Omit<IconProps, 'onPress'>
  };
  ForgotPasswordScreen: undefined;
}
const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack () {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}
