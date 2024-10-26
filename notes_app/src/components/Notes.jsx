import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromNotes } from '../redux/notesSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Notes = () => {

    const notes = useSelector((state) => state.notes.notes); // it is use for select all text 

    const [searchTerm, setSearchTerm] = useState(""); // it is for search term

    const dispatch = useDispatch(); // you may use it for updating,deleting and many more which you make reducer(function) in redux

    const filteredData = notes.filter(
        (notes) => notes.title.toLowerCase().includes(searchTerm.toLowerCase())  // we filtered the data by the reference of title
    );

    function handleDelete(notesId) {
        dispatch(removeFromNotes(notesId)); // it is for delete the note
    }

    return (
        <div>
            <input
                className='p-3 rounded-2xl min-w-[600px] mt-5'
                type="search"
                placeholder='search here'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // it is for search term
            />
            <div className='flex flex-col gap-5 mt-5'>
                {
                    filteredData.length > 0 &&
                    filteredData.map((notes) => {
                        return (
                            <div className='border' key={notes?._id}>
                                <div>
                                    <h1 className='text-2xl'>{notes.title}</h1>
                                </div>
                                <div>
                                    {notes.content}
                                </div>
                                <div className='flex flex-row place-content-evenly'>
                                    <button>
                                    <NavLink to={`/?notesId=${notes?._id}`}>Edit</NavLink>
                                    </button>
                                    <button>
                                        <NavLink to={`/notes/${notes?._id}`}>View</NavLink>
                                    </button>
                                    <button onClick={() => handleDelete(notes?._id)}>Delete</button>
                                    <button onClick={() => {
                                        navigator.clipboard.writeText(notes?.content)
                                        toast.success("Copied to clipboard")
                                    }}>Copy</button>
                                    <button>Share</button>
                                </div>
                                <div>
                                    {notes.createdAt}
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Notes