import { IUser } from "./User"

export interface IProduct {
    "id": string,
    "createdDate": number,
    "lastModifiedBy": any,
    "createdBy": IUser,
    "lastModifiedDate": number,
    "isDeleted": boolean,
    "status": any,
    "statusCode": number,
    "returnMessage": string,
    "creator": IUser,
    "name": string,
    "description": string,
    "category": string,
    "images": Array<string>,
    "price": number,
    "quantity": number,
    "outOfStock": boolean,
    "hasDiscount": boolean,
    "discountPrice": number,
    "published": boolean
}

export interface IRental {
    "id": string,
    "createdDate": number,
    "lastModifiedBy": any,
    "createdBy": any,
    "lastModifiedDate": number,
    "isDeleted": boolean,
    "status": any,
    "statusCode": number,
    "returnMessage": string,
    "creator": IUser,
    "name": string,
    "description": string,
    "category": string,
    "location": string,
    "maximiumNumberOfDays": number,
    "price": number,
    "images": Array<string>,
    "address": any
}