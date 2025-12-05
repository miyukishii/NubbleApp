import { createMMKV } from 'react-native-mmkv';

import { Storage } from '../storage';

const MMKVInstance = createMMKV();

export const MMKVStorage: Storage = {
  getItem: async (key) => {
    const item = MMKVInstance.getString(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  },
  setItem: async (key, value) => {
    const item = JSON.stringify(value);
    MMKVInstance.set(key, item);
  },
  removeItem: async (key) => {
    MMKVInstance.remove(key);
  },
};
