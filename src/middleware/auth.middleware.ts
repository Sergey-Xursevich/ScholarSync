import { verify } from 'jsonwebtoken';
import {StatusCodes} from "http-status-codes";
import { NextFunction, Response } from 'express';

import { SECRET_KEY } from '@config';
import { UserModel } from '@models/users.model';
import { HttpException } from '@/exceptions/httpException';
import { IDataStoredInToken, IRequestWithUser } from '@interfaces/auth.interface';

const getAuthorization = (req) => {
    const cookie = req.headers.cookie.split("; ");
    if (cookie) {
        return cookie.reduce((res, item) => {
            const [key, value] = item.trim().split("=");
            return { ...res, [key]: value };
        }, {})
    }

    const header = req.header('Authorization');
    if (header) return header.split('Bearer ')[1];

    return null;
}

export const AuthMiddleware = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
    try {
        const cookie = getAuthorization(req);

        if (cookie['Authorization']) {
            const { _id } = (await verify(cookie['Authorization'], SECRET_KEY)) as IDataStoredInToken;
            const findUser = await UserModel.findById(_id);

            if (findUser) {
                req.user = findUser;
                next();
            } else {
                next(new HttpException(StatusCodes.UNAUTHORIZED, 'Wrong authentication token'));
            }
        } else {
            next(new HttpException(StatusCodes.NOT_FOUND, 'Authentication token missing'));
        }
    } catch (error) {
        next(new HttpException(StatusCodes.UNAUTHORIZED, 'Wrong authentication token'));
    }
};
