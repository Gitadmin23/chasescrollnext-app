import { IEventType } from '@/models/Event';
import { IUser } from '@/models/User';
import { create } from 'zustand';

type ticket = {
    totalNumberOfTickets: string | number,
    ticketPrice: string | number,
    ticketType: string,
    minTicketBuy: string | number,
    maxTicketBuy: string | number,
    rerouteURL?: string
    ticketsSold?: 0,
}

export type CreateEvent = {
    id?: string
    picUrls: Array<any>,
    collaborators: Array<any>,
    admins: Array<any>,
    eventType: string,
    eventName: string,
    eventDescription: string,
    joinSetting: string,
    locationType: string,
    mediaType?: string,
    currency: string,
    currentPicUrl: string,
    isBought?: boolean
    eventFunnelGroupID: string,
    isPublic: boolean,
    currentVideoUrl?: string,
    isExclusive: boolean,
    mask: boolean,
    attendeesVisibility: boolean,
    minPrice: string,
    maxPrice: string,
    startTime: any,
    endTime: any,
    startDate: any,
    endDate: any,
    location: {
        toBeAnnounced: boolean
        locationDetails?: string,
        link?: string,
        address?: string,
        latlng?: string,
        placeIds?: string
    },
    productTypeData: Array<ticket>,
    createdBy?: IUser
} 

type State = {
    eventdata: CreateEvent
}

type Image = {
    image: any
}

type Navigate = {
    tab: number
}

type Action = {
    updateEvent: (data: State['eventdata']) => void 
    updateImage: (data: Image['image']) => void
    changeTab: (data: Navigate['tab']) => void
}

const useEventStore = create<State & Image & Navigate & Action>((set) => ({
    data: {
        collaborators: [
        ],
        admins: [
        ],
    },
    eventdata: {
        picUrls: [
            ""
        ],
        collaborators: [
        ],
        admins: [
        ],
        eventType: "",
        eventName: "",
        eventDescription: "",
        joinSetting: "public",
        locationType: "",
        currency: "NGN",
        currentPicUrl: "",
        eventFunnelGroupID: "",
        isPublic: true,
        isExclusive: false,
        mask: false,
        attendeesVisibility: true,
        minPrice: "",
        maxPrice: "",
        startTime: "",
        endTime: "",
        startDate: "",
        endDate: "",
        // expirationDate:null,
        location: {
            toBeAnnounced: false,
            locationDetails: "",
            link: "",
            address: "",
            latlng: ""
        },
        productTypeData: [
            // first is always standard
            {
                totalNumberOfTickets: "",
                ticketPrice: "",
                ticketType: "Regular",
                minTicketBuy: "1",
                maxTicketBuy: "",
                rerouteURL: ""
            },
        ],
    },
    image: null,
    tab: 0, 
    updateEvent: (data) => set(() => ({ eventdata: data })),
    updateImage: (data) => set(() => ({ image: data })),
    changeTab: (data) => set(() => ({ tab: data })),
}));



export default useEventStore