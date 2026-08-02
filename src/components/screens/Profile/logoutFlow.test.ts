import { describe, it, expect, mock, beforeEach } from 'bun:test';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/slice/authSlice';
import type { AuthService } from '@/services/authService';
import { logoutFlow } from './logoutFlow';

describe('logoutFlow', () => {
  beforeEach(() => {});

  it('sukses: panggil service.logout → session dibersihkan dari state', async () => {
    const logout = mock(async () => ({ data: null, error: null }));
    const service = { logout } as unknown as AuthService;
    const store = configureStore({ reducer: { auth: authReducer } });

    // User sedang login.
    store.dispatch({ type: 'auth/loginSuccess', payload: { user: { email: 'a@b.c' }, token: 'tok' } });

    const result = await logoutFlow(service, store.dispatch);

    expect(logout).toHaveBeenCalled();
    expect(result).toEqual({ error: null });
    // Intent: session tidak tersisa di memory → AuthGate redirect ke login.
    expect(store.getState().auth).toEqual({
      user: null,
      token: null,
      isLoading: false,
      error: null,
    });
  });

  it('gagal: error tersimpan, session tidak dihapus biar user tidak dianggap logout', async () => {
    const logout = mock(async () => ({ data: null, error: 'network down' }));
    const service = { logout } as unknown as AuthService;
    const store = configureStore({ reducer: { auth: authReducer } });
    store.dispatch({ type: 'auth/loginSuccess', payload: { user: { email: 'a@b.c' }, token: 'tok' } });

    const before = store.getState().auth;
    const result = await logoutFlow(service, store.dispatch);

    expect(result).toEqual({ error: 'network down' });
    expect(store.getState().auth.user).toEqual(before.user);
    expect(store.getState().auth.error).toBe('network down');
  });
});