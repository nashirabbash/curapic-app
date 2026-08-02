import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { supabaseStorage } from './sessionStorage';

/**
 * Factory client Supabase. Gagal jelas kalau env belum di-set — dipisah
 * dari konstanta supaya bisa di-test tanpa env.
 */
export function createSupabaseClient(url: string | undefined, anonKey: string | undefined): SupabaseClient {
  if (!url || !anonKey) {
    throw new Error(
      'Supabase env belum di-set. Salin .env.example ke .env lalu isi EXPO_PUBLIC_SUPABASE_URL dan EXPO_PUBLIC_SUPABASE_ANON_KEY.',
    );
  }
  return createClient(url, anonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      storage: supabaseStorage,
    },
  });
}

export const supabase: SupabaseClient = createSupabaseClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
);
