import { ThemeProvider } from '@shopify/restyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Router } from './src/routes/routes';
import { theme } from './src/theme/theme';
import { Toast } from './src/components/Toast/Toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthCredentialsProvider } from './src/services/authCredentials/useAuthCredentialsProvider';
import { StatusBar } from 'react-native';

if (__DEV__) {
  import('./ReactotronConfig').then(() => {
    // eslint-disable-next-line no-console
    console.log('Reactotron Configurado');
  });
}

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <AuthCredentialsProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <StatusBar backgroundColor="#6200EE" barStyle="light-content" />
          <ThemeProvider theme={theme}>
            <Router />
            <Toast />
          </ThemeProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </AuthCredentialsProvider>
  );
}

export default App;
