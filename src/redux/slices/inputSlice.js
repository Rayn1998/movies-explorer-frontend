import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  input: '',
};

const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    setInput(state, { payload }) {
      state.input = payload;
    },
  }
})

export const { setInput } = inputSlice.actions;
export default inputSlice.reducer;