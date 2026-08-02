import * as SecureStore from 'expo-secure-store';
import type { SupportedStorage } from '@supabase/auth-js';

/**
 * Storage adapter Supabase → expo-secure-store.
 * Session (access + refresh token) di-persist ke Keychain/Keystore,
 * pulih otomatis saat app restart (INITIAL_SESSION).
 *
 * ponytail: SecureStore limit 2KB/item — session pengguna standar muat.
 * Kalau metadata user bikin session >2KB (overflow), ganti ke
 * AsyncStorage atau pecah jadi beberapa key.
 */
export const supabaseStorage: SupportedStorage = {
  getItem: (key) => SecureStore.getItemAsync(key),
  setItem: (key, value) => SecureStore.setItemAsync(key, value),
  removeItem: (key) => SecureStore.deleteItemAsync(key),
};
