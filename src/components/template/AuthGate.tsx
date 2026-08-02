import { Redirect } from 'expo-router';
import type { ReactNode } from 'react';

import { useAppSelector } from '@/store/hooks';

const AUTH_ROUTE = '/(screens)/(auth)/login';

/**
 * Root guard: tanpa session → redirect ke login, session ada → render children
 * (tabs). isLoading true = session masih di-restore dari secure storage —
 * render kosong dulu biar tidak flash login wall.
 */
export function AuthGate({ children }: { children: ReactNode }) {
  const user = useAppSelector((s) => s.auth.user);
  const isLoading = useAppSelector((s) => s.auth.isLoading);

  if (isLoading) return null;
  if (!user) return <Redirect href={AUTH_ROUTE} />;
  return <>{children}</>;
}
