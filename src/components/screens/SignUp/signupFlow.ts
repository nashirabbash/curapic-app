import type { AuthService } from '@/services/authService';
import { loginFailure, loginSuccess, setLoading } from '@/slice/authSlice';
import type { AppDispatch } from '@/store';
import { HOME_ROUTE } from '../Login/routes';

/**
 * Alur daftar akun: signup (simpan nama di metadata) lalu kirim OTP 6 digit.
 * Return { error } — komponen menampilkannya di tahap berjalan.
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
  if (signup.error) return { error: signup.error };

  const otp = await service.sendOtp(user.email);
  if (otp.error) return { error: otp.error };

  return { error: null };
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