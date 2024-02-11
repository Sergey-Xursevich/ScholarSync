import {prop, getModelForClass, modelOptions, Ref} from '@typegoose/typegoose';

import {Rating} from "@models/ratings.model";
import {Comment} from "@models/comments.model";
import {AdditionalMaterial} from "@models/additionalMaterials.model";

@modelOptions({ schemaOptions: { collection: 'lessons', timestamps: true } })
export class Lesson {
    @prop({ type: String, required: true, unique: true })
    public title: String;

    @prop({ type: String, required: true, trim: true })
    public description: String;

    @prop({ type: String, required: true, trim: true })
    public url: String;

    @prop({ ref: () => AdditionalMaterial })
    public additionalMaterials?: Ref<AdditionalMaterial>[];

    @prop({ ref: () => Comment })
    public comments?: Ref<Comment>[];

    @prop({ ref: () => Rating })
    public rating?: Ref<Rating>[];

    public createdAt?: Date;

    public updatedAt?: Date;
}

export const LessonModel = getModelForClass(Lesson);