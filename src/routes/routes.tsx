
import { NavigationContainer } from '@react-navigation/native';

import { ActivityIndicator } from '../components/UI/ActivityIndicator/ActivityIndicator';
import { Box } from '../components/UI/Box/Box';
import { useAuthCredentials } from '../services/authCredentials/useAuthCredentials';

import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';

export function Router() {
  const { authCredentials, isLoading } = useAuthCredentials();
  const authenticated = !!authCredentials;

  if (isLoading) {
    return (
      <Box
        flex={1}
        backgroundColor="background"
        justifyContent="center"
        alignItems="center"
      >
        <ActivityIndicator size="large" />
      </Box>
    );
  }
  return (
    <NavigationContainer>
      {authenticated ? (
        <AppStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}
