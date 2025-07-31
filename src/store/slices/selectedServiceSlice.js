// selectedServiceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const selectedServiceSlice = createSlice({
  name: 'selectedService',
  initialState: null,
  reducers: {
    setSelectedService: (state, action) => action.payload,
    resetSelectedService: () => null,
  },
});

export const { setSelectedService, resetSelectedService } =
  selectedServiceSlice.actions;
export default selectedServiceSlice.reducer;
