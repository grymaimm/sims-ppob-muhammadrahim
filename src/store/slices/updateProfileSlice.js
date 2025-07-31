// redux/features/profileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://take-home-test-api.nutech-integrasi.com';

// Helper ambil token dari localStorage
const getToken = () => localStorage.getItem('token');

// --- GET PROFILE
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

// --- PUT UPDATE PROFILE
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (payload, thunkAPI) => {
    try {
      const res = await axios.put(`${BASE_URL}/profile/update`, payload, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

// --- PUT UPDATE PROFILE IMAGE
export const updateProfileImage = createAsyncThunk(
  'profile/updateProfileImage',
  async (formData, thunkAPI) => {
    try {
      const res = await axios.put(`${BASE_URL}/profile/image`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

const updateProfileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update profile
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.data = { ...state.data, ...action.payload };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update image
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.data = {
          ...state.data,
          profile_image: action.payload.profile_image,
        };
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default updateProfileSlice.reducer;
