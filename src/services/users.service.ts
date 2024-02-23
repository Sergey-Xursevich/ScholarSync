import {Service} from "typedi";
import {StatusCodes} from "http-status-codes";

import {UserModel} from "@models/users.model";
import {IUser} from "@interfaces/users.interface";
import {HttpException} from "@exceptions/HttpException";

@Service()
export class UserService {
    public async createUser(userData: IUser): Promise<IUser> {
        const findUser: IUser = await UserModel.findOne({name: userData.username});

        if (findUser) {
            throw new HttpException(StatusCodes.CONFLICT, `This email ${userData.username} already exists`);
        }

        return await UserModel.create({...userData});
    }

    public async getUser(): Promise<IUser[]> {
        return await UserModel.find();
    }

    public async updateUser(userId: string, data: { name: string, password: string }): Promise<IUser> {
        const findUser: IUser = await UserModel.findById(userId);

        if (!findUser) {
            throw new HttpException(StatusCodes.NOT_FOUND, `This user doesn't exists`);
        }

        return await UserModel.findByIdAndUpdate(userId, data, {returnDocument: "after"});
    }

    public async deleteUser(userId: string): Promise<void> {

        const findUser: IUser = await UserModel.findById(userId);

        if (!findUser) {
            throw new HttpException(StatusCodes.NOT_FOUND, `This user doesn't exists`);
        }

        await UserModel.findByIdAndDelete(userId);
    }
}
