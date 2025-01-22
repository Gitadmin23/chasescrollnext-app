import { IDonation } from '@/models/donation';
import { create } from 'zustand';

type State = {
    data: IDonation
} 

type Action = {
    updateDontion: (data: State['data']) => void  
}

const user_id = localStorage.getItem("user_id")+""

const useDonationStore = create<State & Action>((set) => ({
    data: {
        "visibility": "PUBLIC",
        creatorID: user_id
    } as any,  
    updateDontion: (data) => set(() => ({ data: data })), 
}));



export default useDonationStore