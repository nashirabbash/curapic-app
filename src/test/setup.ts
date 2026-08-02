import { mock } from 'bun:test';

process.env.EXPO_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';

// Polyfill RN tak relevan di node test — mock jadi no-op.
mock.module('react-native-get-random-values', () => ({}));
mock.module('react-native-url-polyfill/auto', () => ({}));

// expo-secure-store = native module; mock in-memory biar test bisa assert.
const secureMemory = new Map<string, string>();
mock.module('expo-secure-store', () => ({
  getItemAsync: async (key: string) => secureMemory.get(key) ?? null,
  setItemAsync: async (key: string, value: string) => void secureMemory.set(key, value),
  deleteItemAsync: async (key: string) => void secureMemory.delete(key),
}));
