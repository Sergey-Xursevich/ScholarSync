import {Types} from "mongoose";

export interface IAvailableCourse {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    courseId: Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}