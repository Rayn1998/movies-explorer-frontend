import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  message: '',
};

const errorPopupSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    onError(state, { payload }) {
      state.open = true;
      state.message = payload;
    },
    offError(state) {
      state.open = false;
    }
  }
})

export const { onError, offError } = errorPopupSlice.actions;
export default errorPopupSlice.reducer;