import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunks
export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        'https://take-home-test-api.nutech-integrasi.com/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchBalance = createAsyncThunk(
  'user/fetchBalance',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        'https://take-home-test-api.nutech-integrasi.com/balance',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    balance: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUserState: (state) => {
      state.profile = null;
      state.balance = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Balance
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;
