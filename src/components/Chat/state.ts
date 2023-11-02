import { IComment } from '@/models/Comment';
import { ICommunity } from '@/models/Communitty';
import { IMediaContent } from '@/models/MediaPost';
import { create } from 'zustand';

type ICommunityPageState = {
    activeCommunity: ICommunity | null;
    messages: IMediaContent[] | [];
    pageNumber: number;
    hasNext: boolean;
    drawerOpen: boolean;
    activeMessageId: string;
    commentHasNext: boolean;
    commentPage: number;
    comments: IComment[];
    setAll: (data: Partial<ICommunityPageState>) => void
}

export const useCommunityPageState = create<ICommunityPageState>((set) => ({
    activeCommunity: null,
    drawerOpen: false,
    messages: [],
    pageNumber: 0,
    hasNext: false,
    activeMessageId: '',
    commentHasNext: false,
    commentPage: 0,
    comments: [],
    setAll: (data) => set((state) => ({ ...state, ...data })),
}))