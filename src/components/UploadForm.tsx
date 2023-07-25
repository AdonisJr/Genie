import React, { useState } from 'react'
import { useStore } from '@/store';
import ButtonSpinner from './ButtonSpinner';

// react toastify imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function UploadForm() {
  
  const [buttonLoading, setButtonLoading] = useState(false)
  const [imageResult, user] = useStore(state=>
    [state.imageResult, state.user])

  const showToastSuccess = (message: String) => {
    toast.success(message, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000
    });
  };

  const handleSubmit = async (e:any) =>{
    e.preventDefault();
    setButtonLoading(true)

    // upload image to cloudinary and save url to mongodb
    await fetch('/api/uploadImage',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: imageResult,
        _id: user.id
      })
    }).then(res => res.json()).then(data => {
      setButtonLoading(false)
      showToastSuccess('Successfully uploaded')
      return data.secure_url
    })
  }

  return (
    <div className='flex gap-3 py-5'>
        <ToastContainer />
        
        <ButtonSpinner loading={buttonLoading} onClick={handleSubmit} name='Uploading'>
          Add to Collection
        </ButtonSpinner>

        <button className="min-w-2/12 flex items-center gap-1 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded duration-200">
            Download
        </button>
    </div>
  )
}
