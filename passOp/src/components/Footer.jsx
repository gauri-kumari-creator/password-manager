import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center w-full'>
         <div className="logo font-bold text-2xl">
             <span className='text-green-700'>&lt;</span>
             
            <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
          
            </div>
        <div>
      Created with <span className='text-[20px]'>❤️</span>by CodeWithHarry
        </div>
    </div>
  )
}

export default Footer
