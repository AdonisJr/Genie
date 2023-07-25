"use client"
import Prompt from "@/components/Prompt"
import Result from "@/components/Result"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useEffect } from "react"
import { useStore } from "@/store"
import CollectionsList from "@/components/CollectionsList"
import {useSession} from "next-auth/react"

export default function Home() {
  const [activePage, setUser, wish, setWish] = 
  useStore(state => [state.activePage, state.setUser, state.wish, state.setWish])
  const {data: session} = useSession()
  
  const getUser = async () =>{
    const newUser = await fetch('/api/user/details',{
      method: 'POST',
      headers:{
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        id: session?.user?.id
      })
    }).then(res => res.json())
    setUser(newUser)
    setWish(newUser.wish)
  }

  useEffect(()=>{
    if(session?.user){
      getUser()
    }
},[session, wish])

  return (
    <main className="flex flex-col bg-white">
      
      <div className="flex flex-col min-h-screen">
      <Header />
          {
            activePage == 'Home' ?
            // Render Home components
              <div>
                  <div className="p-5">
                  <p className="font-serif font-black m-3 text-black text-center text-xl w-12/12 sm:w-5/12"> Where Words Bring Art to Life!</p>
                  <p className="font-serif m-3 text-center text-xl w-12/12 sm:w-8/12"> Get mesmerized by the limitless possibilities of image <span className="text-blue-500">Genie</span>ration</p>
                  
                </div>
                  
                <div className="flex flex-col gap-2 bg-white w-100">
                    <p></p>
                    <Prompt />
                    <Result />
                </div>
              </div>
            :
              // Render Collections component
              <CollectionsList />

          }
          
        
          
      </div>
      
      <Footer />
    </main>
  )
}
// function getCookieData(session: import("next-auth").Session | null): { data: any } {
//   throw new Error("Function not implemented.")
// }

// function setUser(arg0: () => any) {
//   throw new Error("Function not implemented.")
// }

