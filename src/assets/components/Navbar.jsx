import React from 'react'

export default function 
() {
  return (
    <nav className=' flex bg-purple-600 text-white py-2'>
      <div className="logo mx-10 font-semibold underline text-xl cursor-pointer hover:font-bold">
        Your To-do
      </div>
      <ul className='flex space-x-10 text-xl '>
        <li className='cursor-pointer hover:font-bold'>Home</li>
        <li className='cursor-pointer  hover:font-bold'>About us</li>
      </ul>

    </nav>
  )
}
