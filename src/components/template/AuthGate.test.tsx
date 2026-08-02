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

const { AuthGate } = await import('./AuthGate');

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
  it('redirect ke login saat tidak ada session, render tabs saat ada session', () => {
    const { store, renderer } = renderGate('TABS-CONTENT');

    // No session → redirect ke auth group, tabs tidak dirender.
    expect(redirectHref).toBe('/(screens)/(auth)/login');
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
    expect(redirectHref).toBe('/(screens)/(auth)/login');
    expect(json(renderer)).toBeNull();
  });

  it('render kosong saat session masih di-restore (isLoading)', () => {
    const { store, renderer } = renderGate('TABS-CONTENT');
    act(() => {
      store.dispatch(setLoading(true));
    });
    // Tidak ada Redirect baru — nilai lama tidak berubah.
    expect(json(renderer)).toBeNull();
    expect(redirectHref).toBe('/(screens)/(auth)/login');

    // Selesai restore tanpa session → baru redirect ke login.
    act(() => {
      store.dispatch(setLoading(false));
    });
    expect(redirectHref).toBe('/(screens)/(auth)/login');
  });
});
