import { create } from 'zustand';

const PAYSTACK_KEY: any = process.env.NEXT_PUBLIC_PAYSTACK_KEY; 

type State = {
    configPaystack: any,
    donation: boolean,
    dataID: string
} 

type Action = {
    setPaystackConfig: (data: State['configPaystack']) => void  
    setDataID: (data: State['dataID']) => void  
    setDonation: (data: State['donation']) => void  
}

const usePaystackStore = create<State & Action>((set) => ({
    configPaystack: {
        email: "",
        amount: 0,
        reference: "",
        publicKey: PAYSTACK_KEY,
    }, 
    donation: false,
    dataID: "",
    setPaystackConfig: (data) => set(() => ({ configPaystack: data })), 
    setDataID: (data) => set(() => ({ dataID: data })), 
    setDonation: (data) => set(() => ({ donation: data })), 
}));



export default usePaystackStore