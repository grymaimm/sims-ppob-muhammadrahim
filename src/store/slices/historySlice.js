import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk untuk mendapatkan riwayat transaksi
export const fetchTransactionHistory = createAsyncThunk(
  'history/fetchTransactionHistory',
  async ({ offset = 0, limit = 5 }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction/history?offset=${offset}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data.data.records;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to fetch transaction history';
      return rejectWithValue(message);
    }
  },
);

// Initial state untuk riwayat transaksi
const initialState = {
  records: [],
  loading: false,
  error: null,
};

// Slice riwayat transaksi
const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    resetHistory: (state) => {
      state.records = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionHistory.fulfilled, (state, action) => {
        state.loading = false;
        const newRecords = action.payload;

        state.records =
          state.records.length > 0
            ? [...state.records, ...newRecords]
            : newRecords;
      })
      .addCase(fetchTransactionHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetHistory } = historySlice.actions;
export default historySlice.reducer;
