import { describe, it, expect, mock } from 'bun:test';
import { submitLogin } from './submitLogin';
import authReducer from '@/slice/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import type { AuthService } from '@/services/authService';

const store = () => configureStore({ reducer: { auth: authReducer } });

describe('submitLogin', () => {
  it('service sukses → loginSuccess di state, loading berhenti, replace ke tabs', async () => {
    const service = {
      loginEmailPassword: mock(async () => ({
        data: {
          user: { email: 'a@b.c' },
          session: { access_token: 'tok-1' },
        },
        error: null,
      })),
    } as unknown as AuthService;
    const s = store();
    const replaced: string[] = [];

    await submitLogin(
      service,
      { email: 'a@b.c', password: 'secret' },
      s.dispatch,
      (h) => replaced.push(h),
    );

    expect(service.loginEmailPassword).toHaveBeenCalledWith(
      'a@b.c',
      'secret',
    );
    expect(replaced).toEqual(['/(tabs)/home']);
    expect(s.getState().auth).toEqual({
      user: { email: 'a@b.c' },
      token: 'tok-1',
      isLoading: false,
      error: null,
    });
  });

  it('service gagal → loginFailure di state, tidak navigasi', async () => {
    const service = {
      loginEmailPassword: mock(async () => ({
        data: null,
        error: 'Invalid login credentials',
      })),
    } as unknown as AuthService;
    const s = store();
    const replaced: string[] = [];

    await submitLogin(
      service,
      { email: 'a@b.c', password: 'wrong' },
      s.dispatch,
      (h) => replaced.push(h),
    );

    expect(replaced).toEqual([]);
    expect(s.getState().auth).toEqual({
      user: null,
      token: null,
      isLoading: false,
      error: 'Invalid login credentials',
    });
  });

  it('trim email sebelum kirim ke service', async () => {
    const service = {
      loginEmailPassword: mock(async () => ({ data: null, error: 'x' })),
    } as unknown as AuthService;
    const s = store();
    await submitLogin(
      service,
      { email: '  a@b.c  ', password: 'secret' },
      s.dispatch,
      () => {},
    );
    expect(service.loginEmailPassword).toHaveBeenCalledWith(
      'a@b.c',
      'secret',
    );
  });
});
