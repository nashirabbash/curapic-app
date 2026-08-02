import { describe, it, expect, mock, beforeEach } from 'bun:test';
import { act, create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { setLoading, loginSuccess, logout } from '@/slice/authSlice';
import type { ReactElement } from 'react';

// expo-router Redirect tak bisa render di node — mock jadi no-op yang mencatat href.
let redirectHref: string | null = null;
mock.module('expo-router', () => ({
  Redirect: ({ href }: { href: string }) => {
    redirectHref = href;
    return null;
  },
}));

const { AuthGate, AUTH_ROUTE } = await import('./AuthGate');

beforeEach(() => {
  redirectHref = null;
});

function renderGate(children: ReactElement | string) {
  const store = configureStore({ reducer: { auth: authReducer } });
  let renderer: ReturnType<typeof create>;
  act(() => {
    renderer = create(
      <Provider store={store}>
        <AuthGate>{children}</AuthGate>
      </Provider>,
    );
  });
  return { store, renderer: renderer! };
}

function json(renderer: ReturnType<typeof create>) {
  let out: unknown;
  act(() => {
    out = renderer.toJSON();
  });
  return out;
}

describe('AuthGate', () => {
  it('render kosong tanpa redirect selama session masih di-restore (isLoading)', () => {
    // Initial state: isLoading=true (belum tahu session ada/tidak).
    const { store, renderer } = renderGate('TABS-CONTENT');
    expect(redirectHref).toBeNull();
    expect(json(renderer)).toBeNull();

    // Restore selesai tanpa session → baru redirect ke login.
    act(() => {
      store.dispatch(setLoading(false));
    });
    expect(redirectHref).toBe(AUTH_ROUTE);
    expect(json(renderer)).toBeNull();
  });

  it('redirect ke login saat tidak ada session, render tabs saat ada session', () => {
    const { store, renderer } = renderGate('TABS-CONTENT');

    // Restore selesai, tidak ada session → redirect ke auth group, tabs tak dirender.
    act(() => {
      store.dispatch(setLoading(false));
    });
    expect(redirectHref).toBe(AUTH_ROUTE);
    expect(json(renderer)).toBeNull();

    // Login sukses → tabs dirender, redirect tidak muncul lagi.
    act(() => {
      store.dispatch(loginSuccess({ user: { email: 'a@b.c' }, token: 'tok' }));
    });
    expect(json(renderer)).toBe('TABS-CONTENT');

    // Logout → kembali redirect ke login.
    act(() => {
      store.dispatch(logout());
    });
    expect(redirectHref).toBe(AUTH_ROUTE);
    expect(json(renderer)).toBeNull();
  });
});
