import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    onLoading(state) {
      state.loading = true;
    },
    offLoading(state) {
      state.loading = false;
    }
  }
})

export const { onLoading, offLoading } = loadingSlice.actions;
export default loadingSlice.reducer;