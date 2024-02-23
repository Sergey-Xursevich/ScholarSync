import {Types} from "mongoose";

import {prop, getModelForClass, modelOptions} from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'comments', timestamps: true } })
export class Comment {
    @prop({ type: String, required: true, trim: true })
    public text!: String;

    public createdAt?: Date;

    public updatedAt?: Date;
}

export const CommentModel = getModelForClass(Comment);