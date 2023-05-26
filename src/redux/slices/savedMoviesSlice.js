import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  savedMovies: [],
};

let received = [];

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
      state.savedMovies = state.savedMovies.filter(
        (movie) => movie._id !== payload
      );
    },
    // filterSavedMovies(state, { payload }) {
    //   received = state.savedMovies;
    //   state.savedMovies = state.savedMovies.filter(
    //     (movie) =>
    //       movie.nameRU.includes(payload) || movie.nameEN.includes(payload)
    //   );
    // },
  },
});

export const {
  setSavedMovies,
  addSavedMovie,
  removeSavedMovie,
  filterSavedMovies,
} = savedMoviesSlice.actions;
export default savedMoviesSlice.reducer;
