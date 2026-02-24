import { ThemeProvider } from '@shopify/restyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Router } from './src/routes/routes';
import { darkTheme, theme } from './src/theme/theme';
import { Toast } from './src/components/Toast/Toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthCredentialsProvider } from './src/services/authCredentials/useAuthCredentialsProvider';
import { useAppColor, useSettingsService } from './src/services/settings/useSettings';
import { useEffect } from 'react';
import { Appearance } from 'react-native';
import { settingsService } from './src/services/settings/settingsService';

if (__DEV__) {
  import('./ReactotronConfig').then(() => {
    // eslint-disable-next-line no-console
    console.log('Reactotron Configurado');
  });
}

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const appColor = useAppColor()
  const { onSystemChange } = useSettingsService()

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme()

    if (colorScheme) {
      onSystemChange(colorScheme)
    }
  }, [onSystemChange])

  useEffect(() => {
    const subscription = Appearance.addChangeListener((preference) => {
      onSystemChange(preference.colorScheme)
    })

    return () => {
      subscription.remove();
    }
  }, [onSystemChange])

  useEffect(() => {
    settingsService.handleStatusBar(appColor)
  }, [appColor])
  return (
    <AuthCredentialsProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <ThemeProvider theme={appColor === 'dark' ? darkTheme : theme}>
            <Router />
            <Toast />
          </ThemeProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </AuthCredentialsProvider>
  );
}

export default App;
