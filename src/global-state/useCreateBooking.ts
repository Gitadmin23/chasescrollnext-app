import { create } from 'zustand';

type CreateBookingState = {
    locationType: string;
    locationData: {
        link: string;
        address: string;
        country: string;
        street: string
        city: string
        zipCode: string
        locationDetails: string;
        latlng: string;
        state: string;
        placeIds: string;
        toBeAnnouced: string;

    };
    serviceList: [],
    socialMediaHandles: [],
    setAll: (data: Partial<CreateBookingState>) => void       
}

export const useCreateBookingState = create<CreateBookingState>((set) => ({
    locationType: '',
    locationData: {
        link: '',
        address: '',
        country: '',
        street: '',
        city: '',
        zipCode: '',
        locationDetails: '',
        latlng: '',
        state: '',
        placeIds: '',
        toBeAnnouced: '',

    },
    serviceList: [],
    socialMediaHandles: [],
    setAll: (data) => set((state) => ({ ...state, ...data }))
}));