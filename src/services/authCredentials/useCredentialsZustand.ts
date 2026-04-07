import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { storage } from '../storage/storage';

import { AuthCredentialsService } from './authCredentialsTypes';

const useCredentialsStore = create<AuthCredentialsService>()(
  persist(set => ({
    authCredentials: null,
    isLoading: false,
    userId: null,
    saveCredentials: async ac => set({ authCredentials: ac }),
    removeCredentials: async () => set({ authCredentials: null }),
  }),
  {
    name: '@Auth',
    storage: storage,
  }
  ));


export function useCredentialsZustand(): AuthCredentialsService {
  return useCredentialsStore();
}
