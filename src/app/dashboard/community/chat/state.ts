import { ICommunity } from '@/models/Communitty';
import { create } from 'zustand';

type ICommunityPageState = {
    activeCommunity: ICommunity | null;
    drawerOpen: boolean;
    setAll: (data: Partial<ICommunityPageState>) => void
}

export const useCommunityPageState = create<ICommunityPageState>((set) => ({
    activeCommunity: null,
    drawerOpen: false,
    setAll: (data) => set((state) => ({ ...state, ...data })),
}))