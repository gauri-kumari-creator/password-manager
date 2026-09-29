import React from 'react'


const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
        <div className="mycontainer w-[80%] flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-2xl">
             <span className='text-green-700'>&lt;</span>
             
            <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
          
            </div>
       <button className='text-white bg-green-600 w-38 rounded flex items-center justify-center'>
        <i className="text-2xl  fa-brands fa-square-github"></i>
        <span className = "text-[18px] font-bold"> GitHub</span>
       </button>


       </div>
    </nav>
  )
}

export default Navbar
