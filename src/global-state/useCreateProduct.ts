import { create } from 'zustand'; 

export type CreateProduct ={
    creatorID: string,
    name: string,
    description: string,
    images: Array<string>,
    price: number | any,
    category: string,
    quantity: number | any,
    hasDiscount: boolean,
    discountPrice: number | any,
    publish: boolean
}

export type CreateRental = {
    userId: string,
    name: string,
    description: string,
    category: string,
    location: string,
    maximiumNumberOfDays: number | any,
    price: number | any,
    images: Array<string>
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
        category: "Stages and platforms",
        quantity: null,
        hasDiscount: false,
        discountPrice: null,
        publish: true
    },
    image: [],
    imagePreview: [],
    rentaldata: {
        "userId": userId,
        "name": "",
        "description": "",
        "category": "Stages and platforms",
        "location": "",
        "maximiumNumberOfDays": 1,
        "price": null,
        "images": []
    }, 
    updateProduct: (data) => set(() => ({ productdata: data })),
    updateImage: (data) => set(() => ({ image: data })), 
    updateRental: (data) => set(() => ({ rentaldata: data })),
}));



export default useProductStore