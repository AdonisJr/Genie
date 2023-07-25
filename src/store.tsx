import {create } from 'zustand';

interface Store  {
    isLoading: boolean,
    imageResult: string,
    user: {
        id: String
        name: String,
        email: String,
        role: String
    },
    wish: number,
    collections:[],
    activePage: String
}

// actions interface
interface Actions {
    setLoading: (action: any) => void,
    setImage: (data: any) => void,
    setUser: (data: any) => void,
    setCollections: (data: any)=> void
    setActivePage: (data:String)=> void
    decreaseWish: () => void
    setWish: (data: number) => void
}

// store
export const useStore = create<Store & Actions>((set) => ({
    isLoading: false,
    imageResult: '',
    user:{
        id: '',
        name: '',
        email: '',
        role: '',
    },
    wish: 0,
    collections:[],
    activePage: 'Home',
    setLoading: (action) => set(() => ({ isLoading: action })),
    setImage: (data) => set(() => ({ imageResult: data })),
    setUser: (details) => set(()=>({user:{
        id: details.id,
        name: details.name,
        email: details.email,
        role: details.role,
    }})),
    setCollections: (data) => set(()=>({
        collections: data
    })),
    setActivePage: (data) => set(()=>({
        activePage: data
    })),
    decreaseWish: () => set((state)=>({wish: state.wish -1}
    )),
    setWish: (data) => set(()=>({
        wish: data
    }))
  }))