"use client"
import React from 'react'
import Link from 'next/link';
import { useStore } from '@/store';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Header(){
    const {data: session} = useSession();
    const [user, setActivePage, wish] = 
    useStore((state)=> [state.user, state.setActivePage, state.wish]);

  return (
    <header className='sticky top-0 flex flex-col bg-white drop-shadow-lg'>

        <ul className='flex flex-col sm:flex-row justify-between p-3 pe-8 ps-8'>
            <li className='flex items-center gap-10'>
                <img className='rounded-full' src="/genie.jpg" alt="Logo" width={60} height={60} />
                <a className='cursor-pointer' onClick={() => setActivePage('Home')} ><span className='text-2xl font-semibold'>Genie</span></a>
                <a className='cursor-pointer' onClick={() => setActivePage('Collections')} ><span className='font-semibold text-slate-700 hover:text-slate-500'>Collections</span></a>
            </li>
            
            {
                !session?.user ? //if not logged in
            <li className="flex flex-row justify-center items-center gap-3 p-2 text-sm font-mono">
                    <button onClick={()=>signIn()} className='cursor-pointer flex items-center gap-1 bg-blue-500 text-white hover:bg-blue-600 hover:text-white py-2 px-4 rounded duration-200'>Login</button>
                    <Link href='/register' className='text-blue-black hover:text-slate-500 duration-200'>Sign up</Link>
            </li> 
                : //if logged in
            
            <li className="flex border-t-2 mt-2 pt-4 sm:border-0 sm:pt-0 border-slate-300 flex-wrap justify-center items-center gap-3 p-2">
                    
                    <div className="relative inline-flex items-center text-sm font-medium text-center text-white rounded-full hover:shadow-xl">
                        <img src="/wish.svg" alt="Wish" width={40} height={40} />
                        <span className="sr-only">Notifications</span>
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                        {wish.toString()}
                    </div>
                    </div>

                    <div className='cursor-pointer'><span className='text-lg font-semibold'>{user.name.split(' ')[0]}</span></div>
                    
                    <button className='text-red-800 hover:text-red-600' onClick={()=>signOut()}>Logout</button>
                    
            </li>
            }

            
        </ul>
    </header>
  )
}
