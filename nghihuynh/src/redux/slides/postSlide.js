import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: '',
}

export const postSlide = createSlice({
  name: 'post',
  initialState,
  reducers: {
    searchPost: (state, action) => {
      state.search = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { searchPost } = postSlide.actions

export default postSlide.reducer