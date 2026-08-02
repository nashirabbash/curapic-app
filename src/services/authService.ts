import { AuthError, Session, SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export type AuthResult<T> = { data: T | null; error: string | null };

type SupaResponse = { data: unknown; error: AuthError | null };

/**
 * Wrapper tipis di atas Supabase Auth. Client di-inject supaya mudah di-test
 * dengan fake. Semua method mengembalikan shape seragam: { data | error }.
 */
export function createAuthService(client: SupabaseClient = supabase) {
  const toResult = <T>(r: SupaResponse): AuthResult<T> =>
    r.error ? { data: null, error: r.error.message } : { data: r.data as T, error: null };

  return {
    /** Login email + password. */
    async loginEmailPassword(email: string, password: string) {
      return toResult(await client.auth.signInWithPassword({ email, password }));
    },

    /** Daftar akun baru (belum terverifikasi). */
    async signupWithEmail(email: string, password: string) {
      return toResult(await client.auth.signUp({ email, password }));
    },

    /** Kirim kode OTP 6 digit ke email. */
    async sendOtp(email: string) {
      return toResult(await client.auth.signInWithOtp({ email }));
    },

    /** Verifikasi kode OTP. */
    async verifyOtp(email: string, token: string) {
      return toResult(await client.auth.verifyOtp({ email, token, type: 'email' }));
    },

    /** Reset password via OTP (ADR-0002): kirim OTP, bukan reset-link. */
    async resetPassword(email: string) {
      return toResult(await client.auth.signInWithOtp({ email }));
    },

    /** Ganti password Pengguna yang sedang login. */
    async updatePassword(newPassword: string) {
      return toResult(await client.auth.updateUser({ password: newPassword }));
    },

    /** Login via Google OAuth. */
    async googleLogin() {
      return toResult(await client.auth.signInWithOAuth({ provider: 'google' }));
    },

    /** Keluar dari session. */
    async logout() {
      return toResult<null>(await client.auth.signOut() as unknown as SupaResponse);
    },

    /** Dengarkan perubahan state auth (login/logout/refresh). */
    onAuthStateChange(cb: (session: Session | null) => void) {
      return client.auth.onAuthStateChange((_event, session) => cb(session));
    },
  };
}

export type AuthService = ReturnType<typeof createAuthService>;

/**
 * Pasang listener global: session berubah → dispatch ke redux.
 * Dipanggil sekali saat app start.
 */
export function attachAuthListener(
  service: AuthService,
  dispatch: (action: { type: string; payload?: unknown }) => void,
) {
  return service.onAuthStateChange((session) => {
    if (session?.user) {
      dispatch({ type: 'auth/loginSuccess', payload: { user: { email: session.user.email }, token: session.access_token } });
    } else {
      dispatch({ type: 'auth/logout' });
    }
  });
}
