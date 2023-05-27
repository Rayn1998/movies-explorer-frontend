import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies(state, { payload }) {
      if (payload !== undefined && payload !== null) {
        state.movies = [...payload];
      }
    },
  },
});

export const { setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
