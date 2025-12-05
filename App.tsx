import { ThemeProvider } from '@shopify/restyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Router } from './src/routes/routes';
import { theme } from './src/theme/theme';

if (__DEV__) {
  import('./ReactotronConfig').then(() => {
    // eslint-disable-next-line no-console
    console.log('Reactotron Configurado');
  });
}

function App(): React.JSX.Element {


  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}


export default App;
