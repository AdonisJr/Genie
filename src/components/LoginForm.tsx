"use client"
import React, {useState} from 'react';
import Link from 'next/link';
import { useStore } from '@/store';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type userType ={
  email: String,
  password: String
}

export default function LoginForm() {
  const router = useRouter();
  const {data: session} = useSession();
  const [setUser, user, isLoading, setLoading] = useStore(state => [state.setUser, state.user, state.isLoading, state.setLoading])
  
  const [credentials, setCredentials] = useState<userType>({
    email: '',
    password: ''
  })

  const showErrorMessage = (message: String) => {
    toast.error(message, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000
    });
  };
  const showWarningMessage = (message: String) => {
    toast.warning(message, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000
    });
  };


  const emailChange = (e: any) =>{
    setCredentials({...credentials, email: e.target?.value })
  }
  const passwordChange = (e: any) =>{
    setCredentials({...credentials, password: e.target?.value })
  }
  const handleSubmit = async (e: any)=>{
      e.preventDefault()
      setLoading(true)
      const result = await signIn('credentials',{
        email: credentials.email,
        password: credentials.password,
        redirect: false,
        // if you want to redirect after authenticated
        // redirect: true,
        // callbackUrl: '/'
      })
      setLoading(false)
      if(result?.error) return showErrorMessage(result.error)
      router.push('/')
  }

  return (
    <div className='flex flex-col rounded-lg bg-white py-4 px-3'>
      <ToastContainer />
      <form onSubmit={handleSubmit}
          className='flex flex-col justify-center gap-2'>
          <input onChange={emailChange} className='p-2 sm:p-3 px-3 rounded-md border-2 border-slate-400' type="email" placeholder='Email'/>
          <input onChange={passwordChange} className='p-2 sm:p-3 px-3 rounded-md border-2 border-slate-400' type="password" placeholder='Password'/>
          <button type='submit' className='duration-200 min-w-2/12 flex items-center gap-1 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded flex justify-center'>
            {isLoading ? 'Please wait...' : 'Login'}</button>
      </form>
      <Link href='/register' className='text-center hover:underline py-3'>Not a member yet?</Link>
      <div className='border-b-2 border-slate-400 mb-4'></div>
      <button 
        className='duration-200 min-w-2/12 flex items-center gap-1 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded flex justify-center'
        onClick={()=>showWarningMessage('Coming Soon! This feature is currently under development and will be available soon. We are working hard to bring you the best experience. Thank you for your patience!')} 
        type='button'
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
        </svg>
          Sign in with Facebook</button>
    </div>
    
  )
}
