import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: '',
}

export const categorySlide = createSlice({
  name: 'category',
  initialState,
  reducers: {
    searchCategory: (state, action) => {
      state.search = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { searchCategory } = categorySlide.actions

export default categorySlide.reducer