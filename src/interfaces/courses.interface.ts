import {Types} from "mongoose";
import {Ref} from "@typegoose/typegoose";

import {Comment} from "@models/comments.model";
import {AdditionalMaterial} from "@models/additionalMaterials.model";

export enum Difficulty {
    Easy,
    Medium,
    Hard
}

export interface ICourse {
    _id: Types.ObjectId;
    author: Types.ObjectId;
    title: String;
    description: String;
    difficulty: Difficulty;
    tags: String[];
    additionalMaterials: Ref<AdditionalMaterial>[];
    comments: Ref<Comment>[];
    createdAt?: Date;
    updatedAt?: Date;
}