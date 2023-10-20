"use client"
import React, { useRef} from 'react';
import { useStore } from '@/store';

// react toastify imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Prompt() {

  const promptRef = useRef<HTMLInputElement>(null);
  const sizeRef = useRef(null);

  const [isLoading, setLoading, setImage, user, wish, decreaseWish] = useStore((state)=>
    [state.isLoading, state.setLoading, state.setImage, state.user, state.wish, state.decreaseWish]
  )
  console.log(user.id)
  const showErrorMessage = (message: String) => {
    toast.error(message, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000
    });
  };

  async function generateImage (e: any){
    e.preventDefault();
    if(!user.name) return showErrorMessage("Please login");

    if(wish === 0) return showErrorMessage('You have used all your wishes. Please come back later or earn more wishes.')
    
    if(isLoading) return showErrorMessage("Your request still being processed, please wait.");

    const promptData = promptRef.current?.value

    try{
      setLoading(true)
        await fetch('/api/generate',{
          method: 'POST',
          headers:{
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            prompt: promptData ? promptData: 'Generate meme image' ,
            n: 1,
            size: "1024x1024"
          })
        }).then((res)=>{res.json()
          .then((async(data)=>{
              decreaseWish()
              setImage(data.data)
              setLoading(false)
              await fetch('/api/wish/decrease',{
                method: 'POST',
                headers:{
                  'Content-type': 'application/json'
                },
                body: JSON.stringify({
                  id: user.id,
                  wish: wish -1
                })
              })
        }))
      })
      
    }
    catch(error){ 
      console.log(error)
    }
  }

  return (
    <form className='flex flex-col py-2'>
      <ToastContainer />
      
      <div className='flex flex-col mx-4'>
        <p className='w-10/12 my-2 text-slate-500'>Be specific with your wish to get amazing result.</p>
        <div className='flex gap-1 w-12/12'>
          <input 
              type="text" 
              placeholder="Example: a macro 35mm photograph of two mice in Hawaii, they're each wearing tiny swimsuits and are carrying tiny surf boards, digital art" 
              name='promptData'
              className='px-5 text-sm border border-blue-500 w-11/12 rounded'
              ref={promptRef} />

            <button 
              onClick={generateImage} 
              className='min-w-2/12 flex items-center gap-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded duration-200'
              
              >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" 
                className={isLoading ? 'animate-spin bi bi-gear' : 'bi bi-gear'} viewBox="0 0 16 16">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
              </svg>
                {isLoading ? 'Generating..' : 'Generate'}
              </button>
        </div>
            
              
      </div>
    </form>
  )
}
