import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: '',
}

export const configSlide = createSlice({
  name: 'config',
  initialState,
  reducers: {
    searchConfig: (state, action) => {
      state.search = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { searchConfig } = configSlide.actions

export default configSlide.reducer