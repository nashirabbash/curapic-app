import { describe, it, expect } from 'bun:test';
import { supabaseStorage } from './sessionStorage';

describe('supabaseStorage', () => {
  it('roundtrip set → get → remove lewat secure store', async () => {
    await supabaseStorage.setItem('key-a', 'value-1');
    expect(await supabaseStorage.getItem('key-a')).toBe('value-1');

    await supabaseStorage.removeItem('key-a');
    expect(await supabaseStorage.getItem('key-a')).toBeNull();
  });

  it('key berbeda tidak saling menimpa', async () => {
    await supabaseStorage.setItem('k1', 'a');
    await supabaseStorage.setItem('k2', 'b');
    expect(await supabaseStorage.getItem('k1')).toBe('a');
    expect(await supabaseStorage.getItem('k2')).toBe('b');
  });
});
