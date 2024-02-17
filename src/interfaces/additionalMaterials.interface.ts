import {Types} from "mongoose";

export interface IAdditionalMaterial {
    _id: Types.ObjectId;
    link?: String;
    file?: String;
    createdAt?: Date;
    updatedAt?: Date;
};
