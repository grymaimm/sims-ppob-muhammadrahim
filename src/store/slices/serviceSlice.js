import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchServices = createAsyncThunk(
  'service/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'https://take-home-test-api.nutech-integrasi.com/services',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data.data; // array of services
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Gagal mengambil data layanan',
      );
    }
  },
);

const serviceSlice = createSlice({
  name: 'service',
  initialState: {
    services: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default serviceSlice.reducer;
