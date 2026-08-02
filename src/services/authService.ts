import type { AuthChangeEvent, AuthError, Session, SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { loginSuccess, logout, setLoading } from '@/slice/authSlice';
import type { AppDispatch } from '../store';

export type AuthResult<T> = { data: T | null; error: string | null };

type SupaResponse = { data: unknown; error: AuthError | null };

/**
 * Wrapper tipis di atas Supabase Auth. Client di-inject supaya mudah di-test
 * dengan fake. Semua method mengembalikan shape seragam: { data | error }.
 */
export function createAuthService(client: SupabaseClient = supabase) {
  const toResult = <T>(r: SupaResponse): AuthResult<T> =>
    r.error ? { data: null, error: r.error.message } : { data: r.data as T, error: null };

  const sendOtpTo = async (email: string) => toResult(await client.auth.signInWithOtp({ email }));

  return {
    /** Login email + password. */
    async loginEmailPassword(email: string, password: string) {
      return toResult<{
        user: { email?: string } | null;
        session: { access_token: string } | null;
      }>(await client.auth.signInWithPassword({ email, password }));
    },

    /** Daftar akun baru (belum terverifikasi). */
    async signupWithEmail(email: string, password: string) {
      return toResult(await client.auth.signUp({ email, password }));
    },

    /** Kirim kode OTP 6 digit ke email. */
    async sendOtp(email: string) {
      return sendOtpTo(email);
    },

    /** Verifikasi kode OTP. */
    async verifyOtp(email: string, token: string) {
      return toResult(await client.auth.verifyOtp({ email, token, type: 'email' }));
    },

    /** Reset password via OTP (ADR-0002): kirim OTP, bukan reset-link. */
    async resetPassword(email: string) {
      return sendOtpTo(email);
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
      const { error } = await client.auth.signOut();
      return toResult<null>({ data: null, error });
    },

    /** Dengarkan perubahan state auth (login/logout/refresh). */
    onAuthStateChange(cb: (event: AuthChangeEvent, session: Session | null) => void) {
      return client.auth.onAuthStateChange((event, session) => cb(event, session));
    },
  };
}

export type AuthService = ReturnType<typeof createAuthService>;

/**
 * Pasang listener global: session berubah → dispatch ke redux.
 * Akan dipanggil sekali di root layout pada ticket session/guard (#3).
 */
export function attachAuthListener(service: AuthService, dispatch: AppDispatch) {
  return service.onAuthStateChange((event, session) => {
    dispatch(setLoading(false));
    if (event === 'SIGNED_OUT') {
      dispatch(logout());
      return;
    }
    if (session?.user?.email) {
      dispatch(loginSuccess({ user: { email: session.user.email }, token: session.access_token }));
    } else {
      dispatch(logout());
    }
  });
}
