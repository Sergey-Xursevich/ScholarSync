import {Types} from "mongoose";

import {prop, getModelForClass, modelOptions} from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'ratings', timestamps: true } })
export class Rating {
    @prop({ required: true })
    public userId: Types.ObjectId;

    @prop({ type: Number, required: true, min: 0, max: 5 })
    public rating: Number;

    public createdAt?: Date;

    public updatedAt?: Date;
}

export const RatingModel = getModelForClass(Rating);