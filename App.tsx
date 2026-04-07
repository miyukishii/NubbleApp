import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@shopify/restyle';
import { Appearance } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Toast } from './src/components/Toast/Toast';
import { Router } from './src/routes/routes';
import { AuthCredentialsProvider } from './src/services/authCredentials/useAuthCredentialsProvider';
import { settingsService } from './src/services/settings/settingsService';
import { useAppColor, useSettingsService } from './src/services/settings/useSettings';
import { darkTheme, theme } from './src/theme/theme';

if (__DEV__) {
  import('./ReactotronConfig').then(() => {
    // eslint-disable-next-line no-console
    console.log('Reactotron Configurado');
  });
}

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const appColor = useAppColor();
  const { onSystemChange } = useSettingsService();

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();

    if (colorScheme) {
      onSystemChange(colorScheme);
    }
  }, [onSystemChange]);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(preference => {
      onSystemChange(preference.colorScheme);
    });

    return () => {
      subscription.remove();
    };
  }, [onSystemChange]);

  useEffect(() => {
    settingsService.handleStatusBar(appColor);
  }, [appColor]);
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
