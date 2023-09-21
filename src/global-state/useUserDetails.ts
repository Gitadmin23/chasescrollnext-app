import { create } from 'zustand';

type UserState = {
    userId: string;
    firstName: string;
    lastName: string;
    publicProfile: string;
    username: string;
    email: string;
    dob: string;
    setAll: (data: Partial<UserState>) => void       
}

export const useDetails = create<UserState>((set) => ({
    userId: '',
    firstName: '',
    lastName: '',
    publicProfile: '',
    username: '',
    email: '',
    dob: '',
    setAll: (data) => set((state) => ({ ...state, ...data }))
}));