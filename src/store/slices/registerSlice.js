import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk untuk mendaftarkan pengguna
export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/registration`,
        userData,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      return response.data;
    } catch (error) {
      // Tangani error dari respons atau fallback error umum
      return rejectWithValue(
        error.response?.data || { message: 'Registrasi gagal' },
      );
    }
  },
);

// Initial state untuk registrasi
const initialState = {
  loading: false,
  success: false,
  error: null,
};

// Slice untuk menangani state registrasi
const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    // Reset state ke kondisi awal
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload.message || 'Registrasi gagal';
      });
  },
});

export const { resetState } = registerSlice.actions;
export default registerSlice.reducer;
