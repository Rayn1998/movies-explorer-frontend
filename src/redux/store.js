import { configureStore } from '@reduxjs/toolkit';
import menu from './slices/menuSlice';
import error from './slices/errorPopupSlice';
import user from './slices/userSlice';
import loading from './slices/loadingSlice';
import movies from './slices/moviesSlice';

export const store = configureStore({
  reducer: {
    menu,
    error,
    user,
    loading,
    movies,
  }
})
