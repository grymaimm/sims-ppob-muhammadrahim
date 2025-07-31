import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk untuk login user
export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        credentials,
        { headers: { 'Content-Type': 'application/json' } },
      );

      const { token } = response.data.data;
      localStorage.setItem('token', token);

      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Login gagal';
      return rejectWithValue({ message });
    }
  },
);

// Initial state untuk login
const initialState = {
  loading: false,
  user: null,
  error: null,
};

// Slice untuk login
const loginSlice = createSlice({
  name: 'login',
  initialState,
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
        state.error = action.payload.message;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
