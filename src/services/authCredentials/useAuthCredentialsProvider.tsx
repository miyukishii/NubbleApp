import React, { createContext, useEffect, useState } from 'react';

import { api, registerInterceptor } from '../../api/apiConfig';
import { authService } from '../../domain/Auth/authService';
import { AuthCredentials } from '../../domain/Auth/authTypes';

import { authCredentialsStorage } from './authCredentialsStorage';
import { AuthCredentialsService } from './authCredentialsTypes';

export const AuthCredentialContext = createContext<AuthCredentialsService>({
  authCredentials: null,
  isLoading: true,
  userId: null,
  saveCredentials: async () => {},
  removeCredentials: async () => {},
});

export function AuthCredentialsProvider({
  children,
}: // eslint-disable-next-line @typescript-eslint/no-empty-object-type
React.PropsWithChildren<{}>) {
  const [authCredentials, setAuthCredentials] = useState<AuthCredentials | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function startAuthCredentials() {
    try {
      const ac = await authCredentialsStorage.get();
      if (ac) {
        authService.updateToken(ac.token);
        setAuthCredentials(ac);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      //TODO
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    startAuthCredentials();
  }, []);

  useEffect(() => {
    // interceptor to request new token with refresh token
    const interceptor = registerInterceptor({
      authCredentials,
      saveCredentials,
      removeCredentials,
    });

    // remove listener when component unmount
    return () => api.interceptors.response.eject(interceptor);
  }, [authCredentials]);

  async function saveCredentials(ac: AuthCredentials): Promise<void> {
    authService.updateToken(ac.token);
    authCredentialsStorage.set(ac);
    setAuthCredentials(ac);
  }

  async function removeCredentials(): Promise<void> {
    authService.removeToken();
    authCredentialsStorage.remove();
    setAuthCredentials(null);
  }

  const userId = authCredentials?.user.id || null;

  return (
    <AuthCredentialContext.Provider
      value={{
        authCredentials,
        isLoading,
        saveCredentials,
        removeCredentials,
        userId,
      }}
    >
      {children}
    </AuthCredentialContext.Provider>
  );
}
