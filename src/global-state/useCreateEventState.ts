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
           null
        ],
        eventType:null,
        eventName:null,
        eventDescription:null,
        joinSetting: "public",
        locationType:null,
        currency: "USD",
        currentPicUrl:null,
        eventFunnelGroupID:null, 
        isPublic: true,
        isExclusive: false,
        mask: false,
        attendeesVisibility: true,
        minPrice:null,
        maxPrice:null,
        startTime:null,
        endTime:null,
        startDate:null,
        endDate:null,
        // expirationDate:null,
        location: { 
            toBeAnnounced: false
        },
        productTypeData: [
            // first is always standard
            {
                totalNumberOfTickets:null,
                ticketPrice: null,
                ticketType: "Regular",
                minTicketBuy:null,
                maxTicketBuy:null
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