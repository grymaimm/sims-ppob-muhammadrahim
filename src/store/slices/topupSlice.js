import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const postTopup = createAsyncThunk(
  'topup/postTopup',
  async (topupData, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://take-home-test-api.nutech-integrasi.com/topup',
        topupData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const topupSlice = createSlice({
  name: 'topup',
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
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
