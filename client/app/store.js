import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/signin/authSlice';
import qrawerReducer from '../features/qrawer/qrawerSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    qrawer: qrawerReducer
  },
});
