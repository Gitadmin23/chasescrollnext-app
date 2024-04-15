import { create } from 'zustand';

type ticket = {
    totalNumberOfTickets: string,
    ticketPrice: string,
    ticketType: string,
    minTicketBuy: string,
    maxTicketBuy: string,
    rerouteURL: string
}

type CreateEvent = {
    id?: string
    picUrls: Array<any>,
    collaborators:  Array<any>,
    admins:  Array<any>,
    eventType: string,
    eventName: string,
    eventDescription: string,
    joinSetting: string,
    locationType: string,
    mediaType?: string,
    currency: string,
    currentPicUrl: string,
    eventFunnelGroupID: string,
    isPublic: boolean,
    currentVideoUrl?: string,
    isExclusive: boolean,
    mask: boolean,
    attendeesVisibility: boolean,
    minPrice: string,
    maxPrice: string,
    startTime: string,
    endTime: string,
    startDate: string,
    endDate: string,
    location: {
        toBeAnnounced: boolean
    },
    productTypeData: Array<ticket>
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
    eventdata: {
        picUrls: [
            null
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
            toBeAnnounced: false
        },
        productTypeData: [
            // first is always standard
            {
                totalNumberOfTickets: "",
                ticketPrice: "",
                ticketType: "Regular",
                minTicketBuy: "",
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