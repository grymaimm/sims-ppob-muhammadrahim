import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

// Slice untuk mengelola state service yang dipilih
const selectedServiceSlice = createSlice({
  name: 'selectedService',
  initialState,
  reducers: {
    setSelectedService: (state, action) => action.payload,
    resetSelectedService: () => null,
  },
});

export const { setSelectedService, resetSelectedService } =
  selectedServiceSlice.actions;

export default selectedServiceSlice.reducer;
