import { IComment } from '@/models/Comment';
import { ICommunity } from '@/models/Communitty';
import { IEvent } from '@/models/Events';
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
    events: IEvent[];
    eventHasNext: boolean;
    eventPageNumber: number;
    showEvents: boolean;
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
    events: [],
    eventHasNext: false,
    eventPageNumber: 0,
    showEvents: false,
    setAll: (data) => set((state) => ({ ...state, ...data })),
}))