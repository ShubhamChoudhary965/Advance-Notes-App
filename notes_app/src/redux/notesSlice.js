import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notes:localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [],
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addToNotes: (state,action) => {
      
    },
    updateToNotes: (state,action) => {
      
    },
    resetAllNotes: (state, action) => {
      
    },
    removeFromNotes: (state,action) => {

    }
  },
})

// Action creators are generated for each case reducer function
export const { addToNotes, updateToNotes, resetAllNotes, removeFromNotes } = notesSlice.actions

export default notesSlice.reducer