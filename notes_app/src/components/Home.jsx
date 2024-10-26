import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToNotes, updateToNotes } from '../redux/notesSlice';

const Home = () => {
    const [title,setTitle] = useState("");
    const [value,setValue] = useState("");
    const [searchParams,setSearchParams] = useSearchParams();
    const notesId = searchParams.get("notesId");
    const dispatch = useDispatch();
    const allNotes = useSelector((state) => state.notes.notes);

    useEffect(() => {
        if(notesId) {
            const notes = allNotes.find((p) => p._id === notesId);
            setTitle(notes.title);
            setValue(notes.content);
        }
    }, [notesId])

    function createNotes(){
        const notes = {
            title: title,
            content: value,
            _id: notesId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }        

        if(notesId) {
            // if notesId is availbale then update
            dispatch(updateToNotes(notes));
        }
        else{
            // otherwise create 
            dispatch(addToNotes(notes));
        }
        // After creation or updation
        setTitle("");
        setValue("");
        setSearchParams({});
    }

  return (
    <>
    <div>
        <input
        className='p-4 border rounded-xl mr-5'
            type="text"
            placeholder="Enter Your Title Here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createNotes} className='p-4 border'>
            {
                notesId ? "Update My Notes" : "Create My Notes"
            }
        </button>
    </div>

    <div className='mt-8'>
        <textarea
            className='rounded-2xl min-w-[500px] p-6 border'
            placeholder="Enter Your Notes Here"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={20}
        />
    </div>
    </>
  )
}

export default Home