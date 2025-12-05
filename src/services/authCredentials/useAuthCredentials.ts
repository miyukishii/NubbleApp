import { useContext } from 'react';

import { AuthCredentialsService } from './authCredentialsTypes';
import { AuthCredentialContext } from './useAuthCredentialsProvider';


export function useAuthCredentials(): AuthCredentialsService {
  const context = useContext(AuthCredentialContext);
  if (!context) {
    throw new Error('AuthCredentials should be used within a AuthCredentialsProvider');
  }
  return context;
  // return useCredentialsZustand();
}
