import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk untuk melakukan top-up
export const postTopup = createAsyncThunk(
  'topup/postTopup',
  async (topupData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/topup`,
        topupData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data || error.message;
      return rejectWithValue(errorMessage);
    }
  },
);

// Initial state untuk topup
const initialState = {
  loading: false,
  data: null,
  error: null,
};

// Slice topup
const topupSlice = createSlice({
  name: 'topup',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postTopup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postTopup.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postTopup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default topupSlice.reducer;
