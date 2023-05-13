import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    onMenu(state) {
      state.open = true;
    },
    offMenu(state) {
      state.open = false;
    }
  }
})

export const { onMenu, offMenu } = menuSlice.actions;
export default menuSlice.reducer;