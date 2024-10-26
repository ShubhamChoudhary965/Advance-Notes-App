import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToNotes, updateToNotes } from '../redux/notesSlice';

const ViewNotes = () => {

    const {id} = useParams();
    const allNotes = useSelector((state) => state.notes.notes);
    const note = allNotes.filter((p) => p._id === id)[0];
    console.log("notes are" , note)

  return (
    <>
        <div>
        <input
        className='p-4 border rounded-xl mr-5'
            type="text"
            placeholder="Enter Your Title Here"
            value={note.title}
            disabled
            onChange={(e) => setTitle(e.target.value)}
        />
        {/* <button onClick={createNotes} className='p-4 border'>
            {
                notesId ? "Update My Notes" : "Create My Notes"
            }
        </button> */}
    </div>

    <div className='mt-8'>
        <textarea
            className='rounded-2xl min-w-[500px] p-6 border'
            placeholder="Enter Your Notes Here"
            value={note.content}
            disabled
            onChange={(e) => setValue(e.target.value)}
            rows={20}
        />
    </div>
    </>
  )
}

export default ViewNotes