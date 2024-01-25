import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: '',
}

export const sliderSlide = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    searchSlider: (state, action) => {
      state.search = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { searchSlider } = sliderSlide.actions

export default sliderSlide.reducer