import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  slider: false,
};

const searchSliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    sliderOn(state) {
      state.slider = true;
    },
    sliderOff(state) {
      state.slider = false;
    },
  }
})

export const { sliderOn, sliderOff } = searchSliderSlice.actions;
export default searchSliderSlice.reducer;