import {Types} from "mongoose";

export interface IRating {
    userId: Types.ObjectId;
    rating: Number;
    createdAt?: Date;
    updatedAt?: Date
}