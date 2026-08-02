import { mock } from 'bun:test';

process.env.EXPO_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';

// Polyfill RN tak relevan di node test — mock jadi no-op.
mock.module('react-native-get-random-values', () => ({}));
mock.module('react-native-url-polyfill/auto', () => ({}));
