import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  savedMovies: [],
};

const savedMoviesSlice = createSlice({
  name: 'savedMovies',
  initialState,
  reducers: {
    setSavedMovies(state, { payload }) {
      state.savedMovies = [...payload];
    },
    addSavedMovie(state, { payload }) {
      state.savedMovies = [...state.savedMovies, payload];
    },
    removeSavedMovie(state, { payload }) {
      state.savedMovies = state.savedMovies.filter(movie => movie._id !== payload);
    },
    filterSavedMovies(state, { payload }) {
      const filteredMovies = state.savedMovies.filter(movie => movie.includes(payload));
      return filteredMovies;
    }
  }
})

export const { setSavedMovies, addSavedMovie, removeSavedMovie } = savedMoviesSlice.actions;
export default savedMoviesSlice.reducer;