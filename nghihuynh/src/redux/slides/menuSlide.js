import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: '',
}

export const menuSlide = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    searchMenu: (state, action) => {
      state.search = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { searchMenu } = menuSlide.actions

export default menuSlide.reducer