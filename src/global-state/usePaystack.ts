import { create } from 'zustand';

const PAYSTACK_KEY: any = process.env.NEXT_PUBLIC_PAYSTACK_KEY; 

type State = {
    configPaystack: any,
} 

type Action = {
    setPaystackConfig: (data: State['configPaystack']) => void  
}

const usePaystackStore = create<State & Action>((set) => ({
    configPaystack: {
        email: "",
        amount: 0,
        reference: "",
        publicKey: PAYSTACK_KEY,
    }, 
    setPaystackConfig: (data) => set(() => ({ configPaystack: data })), 
}));



export default usePaystackStore