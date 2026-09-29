import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
        <div className="mycontainer w-[80%] flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-2xl">
             <span className='text-green-700'>&lt;</span>
             
            <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
          
            </div>
        <ul>
            <li className='flex gap-4'>
                <a className='hover:font-bold' href='/'>Home</a>
                <a className='hover:font-bold' href='/about'>About</a>
                <a className='hover:font-bold' href='/contact'>Contact</a>
            </li>
        </ul>
        {/* <button className='bg-green-500'>Git Hub
          <img src="" alt="" srcSet="github logo" className='text-white' />
        </button> */}


       </div>
    </nav>
  )
}

export default Navbar
