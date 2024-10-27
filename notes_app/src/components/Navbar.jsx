import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full h-[55px] flex justify-center items-center p-4 bg-gray-900 gap-x-[100px]'>
        <NavLink to="/" className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-semibold text-2xl"
              : "text-white font-medium text-xl"
          }>Home</NavLink>
        <NavLink to="/notes" className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-semibold text-2xl"
              : "text-white font-medium text-xl"
          }>Notes</NavLink>
    </div>
  )
}

export default Navbar