import {Types} from "mongoose";

export interface IComment {
    _id: Types.ObjectId;
    text: String;
    createdAt?: Date;
    updatedAt?: Date;
}