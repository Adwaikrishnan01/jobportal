// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice.js';
import modalReducer from '..modalSlice.js';
const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
  },
});

export default store;
