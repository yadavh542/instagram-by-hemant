import React from 'react';

const Story = ({username,img}:any) => {
  return (
    <div>
    <img 
    className='h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 cursor-pointer object-contain hover:scale-125 transition transform duration-200 ease-out'
    src={img} />
    <p className='w-14 truncate text-xs text-center'>{username}</p>
    </div>
  )
}

export default Story;