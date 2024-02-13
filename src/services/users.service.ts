import {Service} from "typedi";
import { HttpException } from "@exceptions/HttpException";

import { UserModel } from "@models/users.model";
import { IUser } from "@interfaces/users.interface";

@Service()
export class UserService {
    public async createUser(userData: IUser): Promise<IUser> {
        try {
            const findUser: IUser = await UserModel.findOne({ name: userData.username });

            if (findUser) {
                throw new HttpException(409, `This email ${userData.username} already exists`);
            }

            return await UserModel.create({ ...userData });
        } catch (err) {
            throw new HttpException(400, err);
        }
    }

    public async getUser(): Promise<IUser[]> {
        try {
           return await UserModel.find();
        } catch (err) {
            throw new HttpException(400, err);
        }
    }

    public async updateUser(userId: string, data: {name: string, password: string} ): Promise<IUser> {
        try {
            const findUser: IUser = await UserModel.findById(userId);

            if (!findUser) {
                throw new HttpException(404, `This user doesn't exists`);
            }

            return await UserModel.findByIdAndUpdate(userId, data, { returnDocument: "after"});
        } catch (err) {
            throw new HttpException(400, err);
        }
    }

    public async deleteUser(userId: string): Promise<void> {
        try {
            const findUser: IUser = await UserModel.findById(userId);

            if (!findUser) {
                throw new HttpException(404, `This user doesn't exists`);
            }

            await UserModel.findByIdAndDelete(userId);
        } catch (err) {
            throw new HttpException(400, err);
        }
    }
}
