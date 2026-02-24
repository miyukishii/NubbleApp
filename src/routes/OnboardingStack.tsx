import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen } from '../screens/onBoarding/OnboardingScreen/OnboardingScreen';


export type OnboardingParamList = {
  OnboardingScreen: undefined;
}
const Stack = createNativeStackNavigator<OnboardingParamList>();

export function OnboardingStack() {
  return (
    <Stack.Navigator
      initialRouteName="OnboardingScreen"
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
    </Stack.Navigator>
  );
}
