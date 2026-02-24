import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { storage } from '../storage/storage';

import { SearchHistoryService } from './searchHistoryType';

const useSearchHistoryStore = create<SearchHistoryService>()(
  persist(
    (set, get) => ({
      userList: [],

      addUser: (user) =>
      {
        const currentList = get().userList;
        const existing = currentList.some((u) => u.id === user.id);
        if (existing) {return;}

        set((state) => ({
          userList: [...state.userList, user],
        }));
      },

      removeUser: (userId) =>
        set((state) => ({
          userList: state.userList.filter((user) => user.id !== userId),
        })),

      clearUserList: () =>
        set(() => ({
          userList: [],
        })),
    }),
    {
      name: '@SearchHistory',
      storage: storage,
    }
  )
);


export function useSearchHistoryZustand(): SearchHistoryService['userList'] {
  return useSearchHistoryStore(state => state.userList);
}

export function useSearchHistoryService(): Omit<SearchHistoryService, 'userList'> {

  const addUser = useSearchHistoryStore(state => state.addUser);
  const removeUser = useSearchHistoryStore(state => state.removeUser);
  const clearUserList = useSearchHistoryStore(state => state.clearUserList);

  return {
    addUser,
    removeUser,
    clearUserList,
  };
}
