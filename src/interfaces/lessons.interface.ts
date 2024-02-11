import {Types} from "mongoose";
import {Ref} from "@typegoose/typegoose";

import {Comment} from "@models/comments.model";
import {AdditionalMaterial} from "@models/additionalMaterials.model";
import {Rating} from "@models/ratings.model";

export interface ILesson {
    _id: Types.ObjectId;
    title: string;
    description: string;
    url: String;
    additionalMaterials?: Ref<AdditionalMaterial>[];
    comments?: Ref<Comment>[];
    rating?: Ref<Rating>[];
    createdAt?: Date;
    updatedAt?: Date;
}