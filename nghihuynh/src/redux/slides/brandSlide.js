import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: '',
}

export const brandSlide = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.search = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { searchProduct } = brandSlide.actions

export default brandSlide.reducer