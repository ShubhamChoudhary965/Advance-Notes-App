import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  notes: localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [],
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addToNotes: (state, action) => { // is action mein humara poora page aa raha hai
      const notes = action.payload;  // yaha pe humne page nikal liya using payload

      state.notes.push(notes);
      localStorage.setItem("notes", JSON.stringify(state.notes));
      toast.success("Notes created Succesfully");
    },
    updateToNotes: (state, action) => {
      const notes = action.payload;
      const index = state.notes.findIndex((note) => note.id === notes.id);

      if (index >= 0) {
        state.notes[index] = notes;
        localStorage.setItem("notes", JSON.stringify(state.notes));
        toast.success("Notes updated Succesfully");
      }
    },
    resetAllNotes: (state, action) => {
      state.notes = [];
      localStorage.removeItem("notes");
    },
    removeFromNotes: (state, action) => {
      const notes = action.payload;
      const index = state.notes.findIndex((note) => note.id === notes.id);

      if(index >= 0) {
        state.notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(state.notes));
        toast.success("Notes deleted Succesfully");
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToNotes, updateToNotes, resetAllNotes, removeFromNotes } = notesSlice.actions

export default notesSlice.reducer