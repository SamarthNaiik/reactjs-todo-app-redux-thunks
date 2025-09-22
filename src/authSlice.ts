import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { setUserName } from './userSlice';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error?: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
};

// Simulate login API
export const login = createAsyncThunk(
  'auth/login',
  async (name: string, { dispatch }) => {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        dispatch(setUserName(name));
        resolve(name);
      }, 500);
    });
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  return new Promise<void>((resolve) => setTimeout(resolve, 200));
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(login.fulfilled, (state, _action: PayloadAction<string>) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Logout failed';
      });
  },
});

export default authSlice.reducer;
