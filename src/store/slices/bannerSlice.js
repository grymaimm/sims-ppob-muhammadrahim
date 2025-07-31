import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBanners = createAsyncThunk(
  'banner/fetchBanners',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        'https://take-home-test-api.nutech-integrasi.com/banner',
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || 'Failed to fetch banners',
      );
    }
  },
);

const bannerSlice = createSlice({
  name: 'banner',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bannerSlice.reducer;
