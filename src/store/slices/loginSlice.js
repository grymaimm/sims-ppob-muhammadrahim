// store/loginSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        'https://take-home-test-api.nutech-integrasi.com/login',
        credentials,
        { headers: { 'Content-Type': 'application/json' } },
      );
      localStorage.setItem('token', res.data.data.token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Login gagal' });
    }
  },
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload.message || 'Terjadi kesalahan';
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
