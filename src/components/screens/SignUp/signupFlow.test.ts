import { describe, it, expect, mock, beforeEach } from 'bun:test';
import { submitSignup, submitOtp } from './signupFlow';
import authReducer from '@/slice/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import type { AuthService } from '@/services/authService';
import { HOME_ROUTE } from '../Login/routes';

const store = () => configureStore({ reducer: { auth: authReducer } });
const user = { name: 'John Doe', email: 'a@b.c', password: 'secret123' };

describe('submitSignup', () => {
  let signup: ReturnType<typeof mock>;
  let sendOtp: ReturnType<typeof mock>;
  let service: AuthService;

  beforeEach(() => {
    signup = mock(async () => ({ data: {}, error: null }));
    sendOtp = mock(async () => ({ data: {}, error: null }));
    service = {
      signupWithEmail: signup,
      sendOtp: sendOtp,
    } as unknown as AuthService;
  });

  it('sukses: signup (dengan nama) lalu kirim OTP, tanpa error', async () => {
    const result = await submitSignup(service, user);
    expect(signup).toHaveBeenCalledWith('a@b.c', 'secret123', 'John Doe');
    expect(sendOtp).toHaveBeenCalledWith('a@b.c');
    expect(result).toEqual({ error: null });
  });

  it('signup gagal (email terpakai): error kembali, OTP tidak dikirim', async () => {
    signup.mockResolvedValue({ data: null, error: 'User already registered' });
    const result = await submitSignup(service, user);
    expect(signup).toHaveBeenCalled();
    expect(sendOtp).not.toHaveBeenCalled();
    expect(result).toEqual({ error: 'User already registered' });
  });

  it('sendOtp gagal: error kembali', async () => {
    sendOtp.mockResolvedValue({ data: null, error: 'Failed to send code' });
    const result = await submitSignup(service, user);
    expect(result).toEqual({ error: 'Failed to send code' });
  });
});

describe('submitOtp', () => {
  let service: AuthService;
  let s: ReturnType<typeof store>;

  beforeEach(() => {
    s = store();
    service = {
      verifyOtp: mock(async () => ({ data: null, error: null })),
    } as unknown as AuthService;
  });

  it('OTP benar → loginSuccess di state + auto-login replace ke tabs', async () => {
    const verifyOtp = service.verifyOtp as ReturnType<typeof mock>;
    verifyOtp.mockResolvedValue({
      data: { user: { email: 'a@b.c' }, session: { access_token: 'tok' } },
      error: null,
    });
    const replaced: string[] = [];

    const result = await submitOtp(service, 'a@b.c', '123456', s.dispatch, (h) =>
      replaced.push(h),
    );

    expect(verifyOtp).toHaveBeenCalledWith('a@b.c', '123456');
    expect(replaced).toEqual([HOME_ROUTE]);
    expect(s.getState().auth).toEqual({
      user: { email: 'a@b.c' },
      token: 'tok',
      isLoading: false,
      error: null,
    });
    expect(result).toEqual({ error: null });
  });

  it('OTP salah → loginFailure di state, tidak navigasi', async () => {
    const verifyOtp = service.verifyOtp as ReturnType<typeof mock>;
    verifyOtp.mockResolvedValue({
      data: null,
      error: 'Invalid OTP',
    });
    const replaced: string[] = [];

    const result = await submitOtp(service, 'a@b.c', '000000', s.dispatch, (h) =>
      replaced.push(h),
    );

    expect(replaced).toEqual([]);
    expect(s.getState().auth).toEqual({
      user: null,
      token: null,
      isLoading: false,
      error: 'Invalid OTP',
    });
    expect(result).toEqual({ error: 'Invalid OTP' });
  });
});