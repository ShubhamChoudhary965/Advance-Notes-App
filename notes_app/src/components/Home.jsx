import { Copy, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
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
                if(notes) {
                    setTitle(notes.title);
                    setValue(notes.content);
                }
            }
        }, [notesId,allNotes]);

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
    };
    const resetNotes = () => {
        setTitle("");
        setValue("");
        setSearchParams({});
      };

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <div className="w-full flex flex-row gap-x-4 justify-between items-center">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            // Dynamic width based on whether notesId is present
            className={`${
              notesId ? "w-[80%]" : "w-[85%]"
            } text-black border border-input rounded-md p-2 font-semibold text-lg`}
          />
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={createNotes}
          >
            {notesId ? "Update Notes" : "Create My Notes"}
          </button>

        {notesId &&  <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={resetNotes}
          >
            <PlusCircle size={20} />
          </button>}
        </div>

        <div
          className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
        >
          <div
            className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]`}
          >
            <div className="w-full flex gap-x-[6px] items-center select-none group">
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />

              <div
                className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}
              />

              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
            </div>
            <div
              className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}
            >
              <button
                className={`flex justify-center items-center  transition-all duration-300 ease-in-out group`}
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  toast.success("Copied to Clipboard", {
                    position: "top-right",
                  });
                }}
              >
                <Copy className="group-hover:text-sucess-500" size={20} />
              </button>
            </div>
          </div>

          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write Your Content Here...."
            className="w-full p-3  focus-visible:ring-0 font-semibold text-m"
            style={{
              caretColor: "#0000",
            }}
            rows={20}
          />
        </div>
      </div>
    </div>
  )
}

export default Home