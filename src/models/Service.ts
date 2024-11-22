import { IBuisness } from "./Business";
import { IServiceCategory } from "./ServiceCategory";
import { IUser } from "./User"

export type IService = {
            "id": string;
            vendor: IBuisness;
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
}

