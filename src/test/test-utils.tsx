import { ReactElement, ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ThemeProvider } from '@shopify/restyle';
import {
  render,
  renderHook,
  RenderHookOptions,
  RenderOptions,
} from '@testing-library/react-native';

import { Toast } from '../components/Toast/Toast';
import { AuthCredentialsProvider } from '../services/authCredentials/useAuthCredentialsProvider';
import { theme } from '../theme/theme';

export const wrapAllProviders = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity,
      },
      mutations: {
        retry: false,
        gcTime: Infinity,
      },
    },
  });

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>{children}</NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
  return Wrapper;
};

function customRender<T>(component: ReactElement<T>, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(component, { wrapper: wrapAllProviders(), ...options });
}

export const wrapScreenProviders = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity,
      },
      mutations: {
        retry: false,
        gcTime: Infinity,
      },
    },
  });

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <AuthCredentialsProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <NavigationContainer>{children}</NavigationContainer>
          <Toast />
        </ThemeProvider>
      </QueryClientProvider>
    </AuthCredentialsProvider>
  );
  return Wrapper;
};

function renderScreen<T>(component: ReactElement<T>, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(component, { wrapper: wrapScreenProviders(), ...options });
}

function customRenderHook<Result, Props>(
  renderCallback: (props: Props) => Result,
  options?: Omit<RenderHookOptions<NoInfer<Props>>, 'wrapper'>,
) {
  return renderHook(renderCallback, { wrapper: wrapAllProviders(), ...options });
}

export * from '@testing-library/react-native';
export { customRender as render };
export { customRenderHook as renderHook };
export { renderScreen };
