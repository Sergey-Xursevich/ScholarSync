import {Types} from "mongoose";

export interface IComment {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    text: string;
    createdAt?: Date;
    updatedAt?: Date;
}