import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './slices/registerSlice';
import loginReducer from './slices/loginSlice';
import userReducer from './slices/userSlice';
import serviceReducer from './slices/serviceSlice';
import bannerReducer from './slices/bannerSlice';
import topupReducer from './slices/topupSlice';
import transactionHistoryReducer from './slices/transactionHistorySlice';
import historyReducer from './slices/historySlice';
import selectedServiceReducer from './slices/selectedServiceSlice';
import paymentReducer from './slices/paymentSlice';
import updateProfileReducer from './slices/updateProfileSlice';

export const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    user: userReducer,
    service: serviceReducer,
    banner: bannerReducer,
    topup: topupReducer,
    transactionHistory: transactionHistoryReducer,
    history: historyReducer,
    selectedService: selectedServiceReducer,
    payment: paymentReducer,
    updateProfile: updateProfileReducer,
  },
});
