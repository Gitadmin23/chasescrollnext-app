import { create } from 'zustand';

export type CreateProduct = {
    creatorID: string,
    name: string,
    description: string,
    images: Array<string>,
    price: number | any,
    category: string,
    quantity: number | any,
    hasDiscount: boolean,
    discountPrice: number | any,
    publish: boolean;
    location?: {
        link?: string,
        address?: string,
        country?: string,
        street?: string,
        city?: string,
        zipcode?: string,
        state?: string,
        locationDetails?: string,
        latlng?: string,
        placeIds?: string,
        toBeAnnounced?: true
    },
}

export type CreateRental = {
    userId: string,
    name: string,
    description: string,
    category: string,
    location: any
    maximiumNumberOfDays: number | any,
    price: number | any,
    images: Array<string>,
    frequency: "HOURLY" | "DAILY"
}

type State = {
    productdata: CreateProduct
}

type Image = {
    image: Array<any>,
}

type Navigate = {
    rentaldata: CreateRental
}

type Action = {
    updateProduct: (data: State['productdata']) => void
    updateImage: (data: Image['image']) => void
    updateRental: (data: Navigate['rentaldata']) => void
}

const userId = localStorage.getItem('user_id') + "";

const useProductStore = create<State & Image & Navigate & Action>((set) => ({
    productdata: {
        creatorID: userId,
        name: "",
        description: "",
        images: [],
        price: null,
        category: "",
        quantity: null,
        hasDiscount: false,
        discountPrice: null,
        publish: true,
        location: "" as any,
    },
    image: [],
    imagePreview: [],
    rentaldata: {
        "userId": userId,
        "name": "",
        "description": "",
        "category": "",
        "location": {} as any,
        "maximiumNumberOfDays": 1,
        "price": null,
        "images": [],
        frequency: "DAILY"
    },
    updateProduct: (data) => set(() => ({ productdata: data })),
    updateImage: (data) => set(() => ({ image: data })),
    updateRental: (data) => set(() => ({ rentaldata: data })),
}));



export default useProductStore