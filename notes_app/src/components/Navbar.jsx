import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className=' text-xl p-4'>
        <NavLink to="/" className="mr-5">Home</NavLink>
        <NavLink to="/notes">Notes</NavLink>
    </div>
  )
}

export default Navbar