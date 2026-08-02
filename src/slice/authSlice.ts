import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  user: { email: string } | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  // Belum tahu apa-apa sebelum INITIAL_SESSION selesai restore dari storage.
  // true di awal = jangan redirect ke login sebelum cek storage (anti flash).
  isLoading: true,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<{ user: { email: string }; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
    },
  },
});

export const { setLoading, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
