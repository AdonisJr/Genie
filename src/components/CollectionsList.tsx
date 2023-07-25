"use client"
import { useStore } from '@/store';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {useRouter} from 'next/navigation';
import Image from 'next/image';

export default function CollectionsList() {
  const router = useRouter()
  const [collections, setCollections, user] = useStore(state => [state.collections,state.setCollections, state.user])

  const {data: session, status} = useSession()
  
  if(!session?.user) router.push('/auth/signIn')

  const getImages = async ()=>{
    if(!user.id) return
    const images = await fetch('/api/collections',{
      method: 'POST',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        _id: user.id
      })
    }).then(res =>res.json())
    setCollections(images)

  }

  useEffect(()=>{
    if(!session?.user) return
    getImages()
  },[])

  return (
    <div>
      <div className='flex flex-wrap gap-2 p-4'>
        <div>
          <p className='text-xl'>Images</p>
        </div>
        <div className='flex justify-center flex-wrap  gap-2'>
          {
              !user.id ? 
                  ''
          :
              collections.map((image: any) => 
              <Image key={image._id} 
              src={image.image.secure_url} 
              alt='Collections' 
              width={400} 
              height={400} 
              className='border border-gray-300 rounded-lg shadow-md' />)
             
          }
        </div>
        
      </div>
      
    </div>
  )
}