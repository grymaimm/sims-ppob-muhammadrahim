import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

// UPDATE PROFILE
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (body, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        'https://take-home-test-api.nutech-integrasi.com/profile/update',
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update profile',
      );
    }
  },
);

// UPDATE IMAGE
export const updateProfileImage = createAsyncThunk(
  'user/updateProfileImage',
  async (file, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('file', file);

      const res = await axios.put(
        'https://take-home-test-api.nutech-integrasi.com/profile/image',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update profile image',
      );
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
      })

      // UPDATE
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = { ...state.profile, ...action.payload };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE IMAGE
      .addCase(updateProfileImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = {
          ...state.profile,
          profile_image: action.payload.profile_image,
        };
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;
