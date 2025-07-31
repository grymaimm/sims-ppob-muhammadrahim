// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const registerUser = createAsyncThunk(
//   'register/registerUser',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         'https://take-home-test-api.nutech-integrasi.com/registration',
//         userData,
//         { headers: { 'Content-Type': 'application/json' } }
//       );
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// const registerSlice = createSlice({
//   name: 'register',
//   initialState: {
//     loading: false,
//     success: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.success = false;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state) => {
//         state.loading = false;
//         state.success = true;
//         state.error = null;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.success = false;
//         state.error = action.payload.message || 'Terjadi kesalahan';
//       });
//   },
// });

// export default registerSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  'register/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://take-home-test-api.nutech-integrasi.com/registration',
        userData,
        { headers: { 'Content-Type': 'application/json' } },
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: 'Registrasi gagal' },
      );
    }
  },
);

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
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
