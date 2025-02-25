import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-blue-950 text-white p-3'>
        <div className='mx-2 font-bold text-3xl'>
            iTask
        </div>

        <div className='flex gap-5 mx-2 align-middle p-0.5'>
            <div>Home</div>
            <div>Your Tasks</div>
        </div>
    </nav>
  )
}

export default Navbar
