import {prop, getModelForClass, modelOptions, Ref} from '@typegoose/typegoose';

import {Role} from "@interfaces/users.interface";
import {AvailableCourse} from "@models/availableCourses.model";

@modelOptions({ schemaOptions: { collection: 'users', timestamps: true } })
export class User {
    @prop({ type: String, required: true, unique: true })
    public username: string;

    @prop({ type: String, required: true })
    public password: string;

    @prop({ enum: Role, type: Number })
    public role: Role;

    @prop({ ref: () => AvailableCourse })
    public availableCourses?: Ref<AvailableCourse>[]

    public createdAt?: Date;

    public updatedAt?: Date;
}

export const UserModel = getModelForClass(User);