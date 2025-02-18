import { IBuisness } from './Business';
import { IService } from './Service';
import { IUser } from './User';

export type IBooking = {
    id: string;
    createdDate: 0;
    lastModifiedBy: IUser;
    createdBy: IUser;
    lastModifiedDate: number;
    vendor: IBuisness;
    user: IUser;
    businessOwner: IUser;
    service: IService;
    bookingStatus: 'PENDING' | 'IN_PROGRESS' | 'AWAITING_CONFIRMATION' | 'COMPLETED' | 'COMPLETED_WITH_ISSUES' | 'APPROVED' | 'REJECTED' | 'CANCELLED',
    description: string;
    price: number;
    isCompleted: boolean;
    hasPaid: boolean;
}