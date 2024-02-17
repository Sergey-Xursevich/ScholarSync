import {Types} from "mongoose";

import {prop, getModelForClass, modelOptions} from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'available_courses', timestamps: true } })
export class AvailableCourse {
    @prop({ required: true })
    public userId: Types.ObjectId;

    @prop({ required: true })
    public courseId: Types.ObjectId[];

    public createdAt?: Date;

    public updatedAt?: Date;
}

export const AvailableCourseModel = getModelForClass(AvailableCourse);