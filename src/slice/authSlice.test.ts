import { describe, it, expect } from 'bun:test';
import authReducer, { loginSuccess, loginFailure, logout } from './authSlice';

describe('authSlice', () => {
  it('loginSuccess: user+token terset, loading berhenti, error bersih', () => {
    const state = authReducer(
      { user: null, token: null, isLoading: true, error: 'lama' },
      loginSuccess({ user: { email: 'a@b.c' }, token: 'tok-1' }),
    );
    expect(state).toEqual({
      user: { email: 'a@b.c' },
      token: 'tok-1',
      isLoading: false,
      error: null,
    });
  });

  it('loginFailure: error tampil, loading berhenti, user/token tetap null', () => {
    const state = authReducer(
      { user: null, token: null, isLoading: true, error: null },
      loginFailure('Invalid login credentials'),
    );
    expect(state).toEqual({
      user: null,
      token: null,
      isLoading: false,
      error: 'Invalid login credentials',
    });
  });

  it('logout: reset semua state', () => {
    const state = authReducer(
      { user: { email: 'a@b.c' }, token: 'tok', isLoading: true, error: 'x' },
      logout(),
    );
    expect(state).toEqual({ user: null, token: null, isLoading: false, error: null });
  });

  it('initial state: isLoading true (belum restore session, anti flash)', () => {
    expect(authReducer(undefined, { type: 'unrelated' })).toEqual({
      user: null,
      token: null,
      isLoading: true,
      error: null,
    });
  });
});
