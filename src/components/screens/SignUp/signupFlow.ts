import type { AuthService } from '@/services/authService';
import { loginFailure, loginSuccess, setLoading } from '@/slice/authSlice';
import type { AppDispatch } from '@/store';
import { HOME_ROUTE } from '../Login/routes';

/**
 * Daftar akun satu kali (nama disimpan ke metadata Supabase). Kegagalan di
 * sini = akun belum dibuat → aman diulang. Kirim OTP dipisah (sendSignupOtp)
 * karena bisa di-resend, tidak boleh jadi satu transaksi dengan signup.
 */
export async function submitSignup(
  service: AuthService,
  user: { name: string; email: string; password: string },
): Promise<{ error: string | null }> {
  const signup = await service.signupWithEmail(
    user.email,
    user.password,
    user.name,
  );
  return { error: signup.error };
}

/**
 * Kirim OTP 6 digit. Idempoten — aman dipanggil berulang (resend),
 * tidak membuat akun lagi.
 */
export async function sendSignupOtp(
  service: AuthService,
  email: string,
): Promise<{ error: string | null }> {
  const otp = await service.sendOtp(email);
  return { error: otp.error };
}

/**
 * Verifikasi kode OTP → session aktif → auto-login ke tabs.
 * Dipisah dari UI supaya bisa di-test dengan mock service.
 */
export async function submitOtp(
  service: AuthService,
  email: string,
  code: string,
  dispatch: AppDispatch,
  replace: (href: string) => void,
): Promise<{ error: string | null }> {
  dispatch(setLoading(true));
  const result = await service.verifyOtp(email, code);
  if (result.error) {
    dispatch(loginFailure(result.error));
    return { error: result.error };
  }
  dispatch(
    loginSuccess({
      user: { email: result.data?.user?.email ?? email },
      token: result.data?.session?.access_token ?? '',
    }),
  );
  replace(HOME_ROUTE);
  return { error: null };
}
