import { describe, it, expect, mock, beforeEach } from 'bun:test';
import { requestResetOtp, submitNewPassword, verifyResetOtp } from './resetFlow';
import authReducer from '@/slice/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import type { AuthService } from '@/services/authService';
import { HOME_ROUTE } from '../Login/routes';

const store = () => configureStore({ reducer: { auth: authReducer } });

describe('requestResetOtp', () => {
  it('kirim OTP reset via resetPassword (ADR-0002, tanpa deep-link)', async () => {
    const resetPassword = mock(async () => ({ data: {}, error: null }));
    const service = { resetPassword } as unknown as AuthService;
    expect(await requestResetOtp(service, 'a@b.c')).toEqual({ error: null });
    expect(resetPassword).toHaveBeenCalledWith('a@b.c');
  });

  it('email tak dikenal → error dikembalikan, bukan throw', async () => {
    const service = {
      resetPassword: mock(async () => ({
        data: null,
        error: 'User not found',
      })),
    } as unknown as AuthService;
    expect(await requestResetOtp(service, 'ghost@x.c')).toEqual({
      error: 'User not found',
    });
  });
});

describe('verifyResetOtp', () => {
  it('OTP benar → session aktif, tanpa error', async () => {
    const verifyOtp = mock(async () => ({
      data: { user: { email: 'a@b.c' }, session: { access_token: 'tok' } },
      error: null,
    }));
    const service = { verifyOtp } as unknown as AuthService;
    expect(await verifyResetOtp(service, 'a@b.c', '123456')).toEqual({
      error: null,
    });
    expect(verifyOtp).toHaveBeenCalledWith('a@b.c', '123456');
  });

  it('OTP salah → error dikembalikan', async () => {
    const service = {
      verifyOtp: mock(async () => ({ data: null, error: 'Invalid OTP' })),
    } as unknown as AuthService;
    expect(await verifyResetOtp(service, 'a@b.c', '000000')).toEqual({
      error: 'Invalid OTP',
    });
  });
});

describe('submitNewPassword', () => {
  let s: ReturnType<typeof store>;

  beforeEach(() => {
    s = store();
  });

  it('sukses: updatePassword → loginSuccess + auto-login replace tabs', async () => {
    const updatePassword = mock(async () => ({ data: {}, error: null }));
    const service = { updatePassword } as unknown as AuthService;
    const replaced: string[] = [];

    const result = await submitNewPassword(
      service,
      'newpass123',
      s.dispatch,
      (h) => replaced.push(h),
      'a@b.c',
    );

    expect(updatePassword).toHaveBeenCalledWith('newpass123');
    expect(replaced).toEqual([HOME_ROUTE]);
    expect(s.getState().auth).toEqual({
      user: { email: 'a@b.c' },
      token: '',
      isLoading: false,
      error: null,
    });
    expect(result).toEqual({ error: null });
  });

  it('gagal: updatePassword error → loginFailure, tidak navigasi', async () => {
    const updatePassword = mock(async () => ({
      data: null,
      error: 'Password too weak',
    }));
    const service = { updatePassword } as unknown as AuthService;
    const replaced: string[] = [];

    const result = await submitNewPassword(
      service,
      'newpass123',
      s.dispatch,
      (h) => replaced.push(h),
    );

    expect(replaced).toEqual([]);
    expect(s.getState().auth).toEqual({
      user: null,
      token: null,
      isLoading: false,
      error: 'Password too weak',
    });
    expect(result).toEqual({ error: 'Password too weak' });
  });
});