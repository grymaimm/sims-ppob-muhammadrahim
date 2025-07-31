import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const postPayment = createAsyncThunk(
  'payment/postPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://take-home-test-api.nutech-integrasi.com/transaction',
        paymentData,
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

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;

// store/slices/paymentSlice.js
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// export const postPayment = createAsyncThunk(
//   "payment/postPayment",
//   async ({ service_code }, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post('https://take-home-test-api.nutech-integrasi.com/transaction', service_code, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       return response.data;
//     } catch (error) {
//       const msg =
//         error?.response?.data?.message || error?.message || "Terjadi kesalahan";
//       return rejectWithValue(msg);
//     }
//   }
// );

// const paymentSlice = createSlice({
//   name: "payment",
//   initialState: {
//     loading: false,
//     data: null,
//     error: null,
//   },
//   reducers: {
//     clearPayment: (state) => {
//       state.loading = false;
//       state.data = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(postPayment.pending, (state) => {
//         state.loading = true;
//         state.data = null;
//         state.error = null;
//       })
//       .addCase(postPayment.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(postPayment.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearPayment } = paymentSlice.actions;
// export default paymentSlice.reducer;

// store/slices/paymentSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const postPayment = createAsyncThunk(
//   "payment/postPayment",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.post("https://take-home-test-api.nutech-integrasi.com/transaction", payload, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       return res.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Terjadi kesalahan");
//     }
//   }
// );

// const paymentSlice = createSlice({
//   name: "payment",
//   initialState: {
//     data: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     resetPayment: (state) => {
//       state.data = null;
//       state.loading = false;
//       state.error = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(postPayment.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(postPayment.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//         state.error = null;
//       })
//       .addCase(postPayment.rejected, (state, action) => {
//         state.loading = false;
//         state.data = null;
//         state.error = action.payload;
//       });
//   },
// });

// export const { resetPayment } = paymentSlice.actions;
// export default paymentSlice.reducer;
