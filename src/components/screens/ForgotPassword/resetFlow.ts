import type { AuthService } from '@/services/authService';
import { loginFailure, loginSuccess } from '@/slice/authSlice';
import type { AppDispatch } from '@/store';
import { HOME_ROUTE } from '../Login/routes';

/**
 * Kirim OTP 6 digit ke email untuk reset password (ADR-0002, bukan deep-link).
 * Idempoten — aman dipanggil berulang (resend). Email tak dikenal: Supabase
 * mengembalikan error (tidak mengirim), diteruskan ke UI bukan crash.
 */
export async function requestResetOtp(
  service: AuthService,
  email: string,
): Promise<{ error: string | null }> {
  const otp = await service.resetPassword(email);
  return { error: otp.error };
}

/**
 * Verifikasi kode OTP reset → session aktif untuk email tsb. Session ini yang
 * dipakai updatePassword di langkah berikutnya (tanpa perlu login ulang).
 */
export async function verifyResetOtp(
  service: AuthService,
  email: string,
  code: string,
): Promise<{ error: string | null }> {
  const result = await service.verifyOtp(email, code);
  return { error: result.error };
}

/**
 * Set password baru (session aktif dari langkah OTP), lalu auto-login ke tabs.
 * Pola sama dengan submitOtp di signup yang mixed verifikasi + navigate.
 */
export async function submitNewPassword(
  service: AuthService,
  newPassword: string,
  dispatch: AppDispatch,
  replace: (href: string) => void,
  email?: string,
): Promise<{ error: string | null }> {
  // setLoading dikelola oleh screen (handleNewPassword wrap try/finally).
  const result = await service.updatePassword(newPassword);
  if (result.error) {
    dispatch(loginFailure(result.error));
    return { error: result.error };
  }
  dispatch(
    loginSuccess({
      // email dipakai utk label user; bisa kosong jika tidak didapat dari verify.
      user: { email: email ?? '' },
      token: '',
    }),
  );
  replace(HOME_ROUTE);
  return { error: null };
}
