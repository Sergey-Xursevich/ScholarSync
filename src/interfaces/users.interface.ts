import {Types} from "mongoose";
import {Ref} from "@typegoose/typegoose";
import {AvailableCourse} from "@models/availableCourses.model";

export enum Role {
    User,
    Author,
    Admin
}

export interface IUser {
    _id: Types.ObjectId;
    username: string;
    password: string;
    role?: Role;
    availableCourses?: Ref<AvailableCourse>[];
    createdAt?: Date;
    updatedAt?: Date;
}