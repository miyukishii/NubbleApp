import { NavigationContainer } from '@react-navigation/native';

import { ActivityIndicator } from '../components/UI/ActivityIndicator/ActivityIndicator';
import { Box } from '../components/UI/Box/Box';

import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';
import { OnboardingStack } from './OnboardingStack';
import { Stacks, useRouter } from './useRouter';

const mapStacks: Record<Stacks, React.ReactElement> = {
  Loading: (
    <Box
      flex={1}
      backgroundColor="background"
      justifyContent="center"
      alignItems="center"
    >
      <ActivityIndicator size="large" />
    </Box>
  ),
  App: <AppStack />,
  Auth: <AuthStack />,
  Onboarding: <OnboardingStack />
}

export function Router() {
  const stack = useRouter();
  return (
    <NavigationContainer>
      {mapStacks[stack]}
    </NavigationContainer>
  );
}
