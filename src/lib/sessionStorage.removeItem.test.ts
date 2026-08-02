import { describe, it, expect, mock } from 'bun:test';

// Bukti kontrak storage: supabaseStorage.removeItem = SecureStore.deleteItemAsync.
// Supabase signOut menyingkirkan session dengan memanggil removeItem tiap key
// (persistSession adapter) — acceptance "#5 storage bersih" ter-cover di sini.
const deletedKeys: string[] = [];
mock.module('expo-secure-store', () => ({
  getItemAsync: async () => null,
  setItemAsync: async () => {},
  deleteItemAsync: async (key: string) => void deletedKeys.push(key),
}));

const { supabaseStorage } = await import('./sessionStorage');

describe('supabaseStorage.removeItem', () => {
  it('menghapus key dari SecureStore (dipakai Supabase signOut utk clear session)', async () => {
    await supabaseStorage.removeItem('sb-123456789-auth-token');
    expect(deletedKeys).toEqual(['sb-123456789-auth-token']);
  });
});
