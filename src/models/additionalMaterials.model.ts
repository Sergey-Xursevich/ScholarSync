import {Types} from "mongoose";

import {prop, getModelForClass, modelOptions} from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'additional_materials', timestamps: true } })
export class AdditionalMaterial {
    @prop({ type: String, trim: true })
    public link?: Types.ObjectId;

    @prop({ type: String, trim: true })
    public file?: String;

    public createdAt?: Date;

    public updatedAt?: Date;
}

export const AdditionalMaterialModel = getModelForClass(AdditionalMaterial);