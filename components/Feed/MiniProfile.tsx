import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react";


const MiniProfile = () => {
    const {data:session}:any = useSession();
  return (
    <div className='p-3 mt-8 ml-4 border rounded-md flex items-center bg-white'>
        <img 
        src={session? session?.user?.image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png'}
        className='h-10 w-10 p-1 border rounded-full cursor-pointer'
         />

        <div className='mx-4 flex-1'>
            {session && <h2 className='font-bold'>@{session?.user?.name}</h2>}
            <h3 className='text-sm text-gray-400'>Welcome to Instagram</h3>
        </div>
        {session? (<button
        onClick={() =>signOut()}
        className='text-blue-400 text-sm font-semibold hover:scale-125 transition-all duration-150 ease-out'>Sign Out</button>):
        (<button
        onClick={() =>signIn()}
        className='text-blue-400 text-sm font-semibold hover:scale-125 transition-all duration-150 ease-out'>Sign In</button>)}
    </div>
  )
}

export default MiniProfile;