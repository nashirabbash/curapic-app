import { describe, it, expect } from 'bun:test';
import { createSupabaseClient } from '../lib/supabase';

describe('createSupabaseClient', () => {
  it('throw dengan pesan jelas kalau env kosong', () => {
    expect(() => createSupabaseClient(undefined, undefined)).toThrow(/Supabase env belum di-set/);
    expect(() => createSupabaseClient('', '')).toThrow(/Supabase env belum di-set/);
    expect(() => createSupabaseClient('https://x.supabase.co', undefined)).toThrow(/Supabase env belum di-set/);
  });

  it('membuat client kalau url + anon key tersedia', () => {
    const client = createSupabaseClient('https://x.supabase.co', 'anon-key');
    expect(client).toBeDefined();
  });
});
