import { create } from 'zustand';

type State = {
    showModal: boolean,
    open: boolean,
    category: any,
    ticketType: any,
    googlesign: boolean
} 

type Action = {
    setOpen: (data: State['open']) => void 
    setShowModal: (data: State['showModal']) => void 
    setCategory: (data: State['category']) => void 
    setTicketType: (data: State['ticketType']) => void 
    setGoogle: (data: State['googlesign']) => void 
}

const useModalStore = create<State & Action>((set) => ({
    open: false, 
    showModal: false,
    googlesign: true,
    category: {} as any,
    ticketType: {} as any,
    setOpen: (data) => set(() => ({ open: data })),
    setShowModal: (data) => set(() => ({ showModal: data })),
    setCategory: (data) => set(() => ({ category: data })),
    setTicketType: (data) => set(() => ({ ticketType: data })),
    setGoogle: (data) => set(() => ({ googlesign: data })),
}));



export default useModalStore