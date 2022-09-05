import Image from 'next/image';
import React from 'react';
import {
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon,
} from '@heroicons/react/outline';
import {HomeIcon} from '@heroicons/react/solid';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router';
import {useRecoilState} from 'recoil';
import { modalState } from '../atoms/modalAtom';

const Header = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [open, setOpen] = useRecoilState(modalState);

  return (
    <div className='shadow-sm border-b bg-white sticky top-0 z-50'>
        <div className='max-w-4xl mx-5 lg:mx-auto flex justify-between'>
            
        
        {/* Left */}
        <div onClick={()=>router.push('/')} className='relative hidden lg:inline-grid w-24 cursor-pointer'>
            <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png' layout='fill' objectFit='contain'/>
        </div>
        <div onClick={()=>router.push('/')} className='relative w-10 lg:hidden flex-shrink-0 cursor-pointer'>
           <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png' layout='fill' objectFit='contain'/>
        </div>

        {/* Middle */}

        <div className='max-w-xs relative mt-1 p-2 rounded-md'>
            <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                <SearchIcon className=' w-5 text-gray-500'/>
            </div>
            <input type="text" placeholder='Search' className='bg-gray-50 block w-full pl-10 rounded-md sm:text-sm border-gray-300 focus:ring-black focus:border-black'/>
        </div>

        {/* Right */}
            <div className='items-center flex justify-end space-x-4'>
                <HomeIcon onClick={()=>router.push('/')} className='navBtn'/>
                <MenuIcon className='w-6 h-6 cursor-pointer md:hidden'/>


                {session?(
                <> 
                <div className='relative navBtn'>
                <PaperAirplaneIcon className='navBtn rotate-45'/>
                <div className='bg-red-500 -top-1 -right-2 text-xs rounded-full items-center flex justify-center text-white animate-pulse w-5 h-5 absolute'>2</div>
                </div>
                
                <PlusCircleIcon onClick={()=>setOpen(true)} className='navBtn'/>
                <UserGroupIcon className='navBtn'/>
                <HeartIcon className='navBtn'/>
                <img 
                onClick={()=>signOut()}
                className='h-8 w-8 rounded-full cursor-pointer border p-[1.5px] object-contain'
                src={session? session?.user?.image:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png"} alt="" /> </>):
                <button
                onClick={() =>signIn()}
                className='text-blue-400 text-sm font-semibold transition-all hover:scale-110 duration-150 ease-out'>Sign In</button>
                }
                
            </div>

        </div>
    </div>
  )
}

export default Header;