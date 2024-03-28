import { create } from 'zustand';

type State = {
    showModal: boolean,
    open: boolean,
    category: any
} 

type Action = {
    setOpen: (data: State['open']) => void 
    setShowModal: (data: State['showModal']) => void 
    setCategory: (data: State['category']) => void 
}

const useModalStore = create<State & Action>((set) => ({
    open: false, 
    showModal: false,
    category: {} as any,
    setOpen: (data) => set(() => ({ open: data })),
    setShowModal: (data) => set(() => ({ showModal: data })),
    setCategory: (data) => set(() => ({ category: data })),
}));



export default useModalStore