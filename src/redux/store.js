import { configureStore } from '@reduxjs/toolkit';
import menu from './slices/menuSlice';

export const store = configureStore({
  reducer: {
    menu,
  }
})
