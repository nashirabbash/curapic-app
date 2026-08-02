import { describe, it, expect, mock, beforeEach } from 'bun:test';
import type { Session, SupabaseClient } from '@supabase/supabase-js';
import { createAuthService, attachAuthListener, type AuthService } from './authService';

type AuthMethod = 'signInWithPassword' | 'signUp' | 'signInWithOtp' | 'verifyOtp' | 'updateUser' | 'signInWithOAuth' | 'signOut' | 'onAuthStateChange';
type FakeAuth = Record<AuthMethod, any>;

function makeFakeClient() {
  const auth: FakeAuth = {
    signInWithPassword: mock(() => Promise.resolve(undefined)),
    signUp: mock(() => Promise.resolve(undefined)),
    signInWithOtp: mock(() => Promise.resolve(undefined)),
    verifyOtp: mock(() => Promise.resolve(undefined)),
    updateUser: mock(() => Promise.resolve(undefined)),
    signInWithOAuth: mock(() => Promise.resolve(undefined)),
    signOut: mock(() => Promise.resolve(undefined)),
    onAuthStateChange: mock(() => undefined),
  };
  const ok = (data: unknown) => ({ data, error: null });
  auth.signInWithPassword.mockResolvedValue(ok({ user: {}, session: {} }));
  auth.signUp.mockResolvedValue(ok({ user: {} }));
  auth.signInWithOtp.mockResolvedValue(ok({}));
  auth.verifyOtp.mockResolvedValue(ok({ user: {} }));
  auth.updateUser.mockResolvedValue(ok({ user: {} }));
  auth.signInWithOAuth.mockResolvedValue(ok({}));
  auth.signOut.mockResolvedValue(ok(null));
  auth.onAuthStateChange.mockReturnValue({ data: { subscription: { unsubscribe: () => {} } } });
  const client = { auth } as unknown as SupabaseClient;
  return { auth, client };
}

describe('createAuthService', () => {
  let auth: FakeAuth;
  let client: SupabaseClient;
  let service: AuthService;

  beforeEach(() => {
    ({ auth, client } = makeFakeClient());
    service = createAuthService(client);
  });

  it('loginEmailPassword memanggil signInWithPassword dengan email+password', async () => {
    await service.loginEmailPassword('a@b.c', 'secret');
    expect(auth.signInWithPassword).toHaveBeenCalledWith({ email: 'a@b.c', password: 'secret' });
  });

  it('signupWithEmail memanggil signUp', async () => {
    await service.signupWithEmail('a@b.c', 'secret');
    expect(auth.signUp).toHaveBeenCalledWith({ email: 'a@b.c', password: 'secret' });
  });

  it('sendOtp dan resetPassword memanggil signInWithOtp', async () => {
    await service.sendOtp('a@b.c');
    expect(auth.signInWithOtp).toHaveBeenCalledWith({ email: 'a@b.c' });
    await service.resetPassword('a@b.c');
    expect(auth.signInWithOtp).toHaveBeenCalledWith({ email: 'a@b.c' });
  });

  it('verifyOtp memanggil verifyOtp dengan type email', async () => {
    await service.verifyOtp('a@b.c', '123456');
    expect(auth.verifyOtp).toHaveBeenCalledWith({ email: 'a@b.c', token: '123456', type: 'email' });
  });

  it('updatePassword memanggil updateUser', async () => {
    await service.updatePassword('new-pass');
    expect(auth.updateUser).toHaveBeenCalledWith({ password: 'new-pass' });
  });

  it('googleLogin memanggil signInWithOAuth provider google', async () => {
    await service.googleLogin();
    expect(auth.signInWithOAuth).toHaveBeenCalledWith({ provider: 'google' });
  });

  it('logout memanggil signOut', async () => {
    await service.logout();
    expect(auth.signOut).toHaveBeenCalled();
  });

  it('mengembalikan pesan error dari Supabase saat gagal', async () => {
    auth.signInWithPassword.mockImplementation(async () => ({ data: null, error: { message: 'Invalid login credentials' } }));
    const result = await service.loginEmailPassword('a@b.c', 'wrong');
    expect(result).toEqual({ data: null, error: 'Invalid login credentials' });
  });

  it('onAuthStateChange meneruskan session ke callback', async () => {
    let received: Session | null | undefined;
    const session = { access_token: 'tok', user: { email: 'a@b.c' } } as unknown as Session;
    auth.onAuthStateChange.mockImplementation((cb: (e: string, s: Session | null) => void) => {
      cb('SIGNED_IN', session);
      return { data: { subscription: { unsubscribe: () => {} } } };
    });
    service.onAuthStateChange((s) => (received = s));
    expect(received).toBe(session);
  });
});

describe('attachAuthListener', () => {
  it('dispatch loginSuccess saat session ada, logout saat null', async () => {
    const { auth, client } = makeFakeClient();
    const service = createAuthService(client);
    const dispatch = mock();
    let emit: (s: Session | null) => void = () => {};
    auth.onAuthStateChange.mockImplementation((cb: (e: string, s: Session | null) => void) => {
      emit = (s) => cb('CHANGED', s);
      return { data: { subscription: { unsubscribe: () => {} } } };
    });

    attachAuthListener(service, dispatch);

    emit({ access_token: 'tok', user: { email: 'a@b.c' } } as unknown as Session);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'auth/loginSuccess',
      payload: { user: { email: 'a@b.c' }, token: 'tok' },
    });

    emit(null);
    expect(dispatch).toHaveBeenCalledWith({ type: 'auth/logout' });
  });
});
