import {Types} from "mongoose";
import {prop, getModelForClass, modelOptions, Ref} from '@typegoose/typegoose';

import {Comment} from "@models/comments.model";
import {Difficulty} from "@interfaces/courses.interface";
import {AdditionalMaterial} from "@models/additionalMaterials.model";

@modelOptions({ schemaOptions: { collection: 'courses', timestamps: true } })
export class Course {
    @prop({ required: true })
    public author: Types.ObjectId;

    @prop({ required: true, type: String, trim: true })
    public title: String;

    @prop({ required: true, type: String, trim: true })
    public description: String;

    @prop({ enum: Difficulty, type: Number, required: true })
    public difficulty: Difficulty;

    @prop({ type: String })
    public tags?: String[];

    @prop({ ref: () => AdditionalMaterial })
    public additionalMaterials?: Ref<AdditionalMaterial>[];

    @prop({ ref: () => Comment })
    public comments?: Ref<Comment>[];

    public createdAt?: Date;

    public updatedAt?: Date;
}

export const CourseModel = getModelForClass(Course);