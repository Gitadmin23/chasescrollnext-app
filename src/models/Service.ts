import { IBuisness } from "./Business";
import { IServiceCategory } from "./ServiceCategory";
import { IUser } from "./User"

export type IService = {
            "id": string;
            vendor: IBuisness;
            service: IServiceCategory;
            serviceID?: string;
            price: number;
            hasFixedPrice: boolean;
            discount: number;
            serviceID: string;
            "openingHours": Array<{
                "startTime": number,
                "endTime": number,
                "availabilityDayOfWeek": number
        }>;
        images: Array<string>;
        description: string;
        rating: number;
}

