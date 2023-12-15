import { create } from 'zustand';

type State = {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
}

export const useShowHomeModal = create<State>((set) => ({
    showModal: false,
    setShowModal: (value) => set({ showModal: value }),
}))