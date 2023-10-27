import { create } from 'zustand';

type State = {
    eventdata: any
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
            ""
        ],
        eventType: "",
        eventName: "",
        eventDescription: "",
        joinSetting: "public",
        locationType: "",
        currency: "USD",
        currentPicUrl: "",
        eventFunnelGroupID: "",
        mediaType: "",
        currentVideoUrl: "",
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
        // expirationDate: "",
        location: {
            link: "",
            address: "",
            locationDetails: "",
            latlng: "",
            placeIds: "",
            toBeAnnounced: false
        },
        productTypeData: [
            // first is always standard
            {
                totalNumberOfTickets: "",
                ticketPrice: "",
                ticketType: "Regular",
                minTicketBuy: "",
                maxTicketBuy: ""
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