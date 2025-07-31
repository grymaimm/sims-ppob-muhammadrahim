import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk untuk mengambil riwayat transaksi
export const fetchTransactionHistory = createAsyncThunk(
  'transactionHistory/fetchTransactionHistory',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'https://take-home-test-api.nutech-integrasi.com/transaction/history',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Gagal mengambil riwayat transaksi',
      );
    }
  },
);

const transactionHistorySlice = createSlice({
  name: 'transactionHistory',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTransactionHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionHistorySlice.reducer;
