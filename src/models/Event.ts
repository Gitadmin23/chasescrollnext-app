import {IUser} from "@/models/User";

export interface IEventType {
    "id": "66195e61e19efa4501491f7c",
    "createdDate"?: 1712938593125,
    "lastModifiedBy": IUser;
    "createdBy": IUser;
    "lastModifiedDate"?: number;
    "isDeleted": boolean;
    "picUrls": string[],
    "eventMemberRole": string;
    "eventName": string;
    "eventDescription": string;
    "eventType": string;
    "locationType": string;
    "currency": string;
    "currentPicUrl": string;
    "eventFunnelGroupID": string;
    "mediaType": string;
    "currentVideoUrl": string;
    "isPublic": boolean;
    "isExclusive": boolean;
    "mask": boolean;
    "isOrganizer": boolean;
    "attendeesVisibility": boolean;
    "isJoined": boolean;
    "isSaved": boolean;
    "isFree": boolean;
    "isBought": boolean;
    "ticketBought": boolean;
    "externalEvent": string;
    "minPrice": any;
    "maxPrice": any;
    "startTime": any;
    "endTime": any;
    "startDate": any;
    "endDate": any;
    "expirationDate": string;
    "memberCount": number;
    "location": {
        "link": string;
        "address": string;
        "locationDetails": string;
        "latlng"?: string;
        "placeIds"?: string;
        "toBeAnnounced"?: boolean;
    },
    "productTypeData": IProductTypeData[],
    "interestedUsers": IUser[],
    "collaborators": IUser[],
    "admins": IUser[]

}

interface IProductTypeData  {
    "totalNumberOfTickets": number | string ;
    "ticketPrice": number | string;
    "ticketType": string;
    "ticketsSold"?: number | string;
    "sale"?: any;
    "minTicketBuy": number | string;
    "maxTicketBuy": number | string;
    "rerouteURL"?: string;
    "clickThroughCount"?: number | string;
}
