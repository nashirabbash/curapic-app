import type { AuthService } from '@/services/authService';
import { loginFailure, loginSuccess, setLoading } from '@/slice/authSlice';
import type { AppDispatch } from '@/store';
import { HOME_ROUTE } from './routes';

/**
 * Alur submit login email/password: panggil service → dispatch hasil ke redux
 * → navigasi ke tabs. Dipisah dari komponen supaya bisa di-test dengan mock
 * service tanpa merender UI native (@expo/ui tak bisa render di node).
 */
export async function submitLogin(
  service: AuthService,
  credentials: { email: string; password: string },
  dispatch: AppDispatch,
  replace: (href: string) => void,
) {
  dispatch(setLoading(true));
  const result = await service.loginEmailPassword(
    credentials.email.trim(),
    credentials.password,
  );
  if (result.error) {
    dispatch(loginFailure(result.error));
    return;
  }
  // Session juga di-set via onAuthStateChange (listener di root layout);
  // dispatch manual supaya navigasi tidak menunggu event Supabase (race).
  dispatch(
    loginSuccess({
      user: { email: result.data?.user?.email ?? credentials.email.trim() },
      token: result.data?.session?.access_token ?? '',
    }),
  );
  replace(HOME_ROUTE);
}
