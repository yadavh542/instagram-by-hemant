import React, { useEffect, useState } from 'react';

const Suggestions = () => {
    const [suggestions, setSuggestions]:any = useState();

    useEffect(() => {
        fetch('https://dummyjson.com/users')
        .then(res=>res.json())
        .then((data:any)=>setSuggestions(data))
        .catch(e=>console.log(e))
    },[])

  return (
    <div className=' border p-3 rounded-md my-4 ml-4 bg-white'>
        <div className='flex justify-between'>
            <p className='text-gray-400 text-sm'>Suggestions for you</p>
            <p className='text-sm font-semibold cursor-pointer'>See All</p>
        </div>
        
        {suggestions?.users?.map((s:any)=>(   
             
            <div key={s.id} className='flex items-center mt-3 justify-between'>
                

                <div className='flex'>
                    <img src={s.image} 
                    className='h-8 w-8 rounded-full border p-[1.5px] cursor-pointer'
                    />
                    <div className='ml-2'> 
                    <h2 className='text-sm font-bold'>{s.username}</h2>
                    <h3 className='text-xs font-semibold text-gray-400 truncate'>Works At {s.company.name}</h3>
                    </div> 
                </div>
                <button className='text-xs text-blue-400 font-semibold'>Follow</button>
            </div>
        
        ))}
    </div>
  )
}

export default Suggestions;