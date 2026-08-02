import type { AuthService } from '@/services/authService';
import { loginFailure, logout } from '@/slice/authSlice';
import type { AppDispatch } from '@/store';

/**
 * Alur keluar: panggil service.logout() (Supabase signOut — juga menghapus
 * session dari secure storage via adapter persistSession) → dispatch hasil ke
 * redux. Dipisah dari komponen supaya bisa di-test dengan mock service tanpa
 * merender UI native (@expo/ui tak bisa render di node).
 *
 * Navigasi tidak di-handle di sini: saat `logout` di-dispatch, AuthGate
 * langsung redirect ke login wall (user null).
 */
export async function logoutFlow(
  service: AuthService,
  dispatch: AppDispatch,
): Promise<{ error: string | null }> {
  const result = await service.logout();
  if (result.error) {
    dispatch(loginFailure(result.error));
    return { error: result.error };
  }
  // Listener global (SIGNED_OUT) juga dispatch logout; dispatch manual supaya
  // state bersih tanpa menunggu event Supabase (race di test mock).
  dispatch(logout());
  return { error: null };
}