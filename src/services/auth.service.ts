import {Service} from "typedi";
import {hash, compare} from "bcrypt";
import {StatusCodes} from "http-status-codes";

import {createToken} from "@config";
import {UserModel} from "@models/users.model";
import {IUser} from "@interfaces/users.interface";
import {ITokenData} from "@interfaces/auth.interface";
import {HttpException} from "@exceptions/HttpException";

const createCookie = (tokenData: ITokenData): string => {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
}

@Service()
export class AuthService {
    public async signup(userData: IUser): Promise<IUser> {
        const findUser: IUser = await UserModel.findOne({ username: userData.username });

        if (findUser) {
            throw new HttpException(StatusCodes.CONFLICT, `This user ${userData.username} is already exists`)
        }

        const hashedPassword = await hash(userData.password, 10);
        return await UserModel.create({ ...userData, password: hashedPassword });
    }

    public async login(userData: IUser): Promise<{ cookie: string; findUser: IUser }> {
        const findUser: IUser = await UserModel.findOne({ username: userData.username });
        if (!findUser) {
            throw new HttpException(StatusCodes.BAD_REQUEST, 'Invalid credentials');
        }

        const isMatch = await compare(userData.password, findUser.password);
        if (!isMatch) {
            throw new HttpException(StatusCodes.BAD_REQUEST, 'Invalid credentials');
        }

        const tokenData = createToken(findUser);
        const cookie = createCookie(tokenData);

        return { cookie, findUser };
    }

    public async logout(userData: IUser): Promise<IUser> {
        const findUser: IUser = await UserModel.findOne({ username: userData.username, password: userData.password });

        if (!findUser) {
            throw new HttpException(StatusCodes.CONFLICT, `This user ${userData.username} was not found`)
        }

        return findUser;
    }
}