import { IBuisness, ISocialMediaHandles } from "./Business";
import { IServiceCategory } from "./ServiceCategory";
import { IUser } from "./User"

export type IService = {
        id: string;
        name: string;
        vendor: IUser;
        service: IServiceCategory;
        price: number;
        hasFixedPrice: boolean;
        discount: number;
        "openingHours": Array<{
                "startTime": number,
                "endTime": number,
                "availabilityDayOfWeek": number
        }>;
        images: Array<string>;
        description: string;
        rating: number;
        vendorID: string;
        category: string;
        email: string
        address: string;
        isOnline: boolean;
        phone: string;
        socialMediaHandles: Array<ISocialMediaHandles>;
        createdDate: number;
}

