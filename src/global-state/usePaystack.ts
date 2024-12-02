import { create } from 'zustand';

const PAYSTACK_KEY: any = process.env.NEXT_PUBLIC_PAYSTACK_KEY; 

type State = {
    configPaystack: any,
    donation: boolean,
    booking: boolean,
    dataID: string
} 

type Action = {
    setPaystackConfig: (data: State['configPaystack']) => void  
    setDataID: (data: State['dataID']) => void  
    setDonation: (data: State['donation']) => void  
    setBooking: (data: State['booking']) => void  
}

const usePaystackStore = create<State & Action>((set) => ({
    configPaystack: {
        email: "",
        amount: 0,
        reference: "",
        publicKey: PAYSTACK_KEY,
    }, 
    donation: false,
    booking: false,
    dataID: "",
    setPaystackConfig: (data) => set(() => ({ configPaystack: data })), 
    setDataID: (data) => set(() => ({ dataID: data })), 
    setDonation: (data) => set(() => ({ donation: data })), 
    setBooking: (data) => set(() => ({ booking: data })), 
}));



export default usePaystackStore