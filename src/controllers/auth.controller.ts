import {Container} from "typedi";
import { NextFunction, Request, Response } from 'express'
import {StatusCodes, ReasonPhrases} from "http-status-codes";

import {IUser} from "@interfaces/users.interface";
import {AuthService} from "@services/auth.service";

export class AuthController {
    public auth = Container.get(AuthService);

    public signUp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: IUser = req.body;
            const signUpUserData: IUser = await this.auth.signup(userData);
            res.status(StatusCodes.CREATED).json({ data: signUpUserData, message: ReasonPhrases.CREATED });
        } catch (error) {
            next(error);
        }
    };

    public logIn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: IUser = req.body;
            const { findUser, cookie } = await this.auth.login(userData);

            res.setHeader('Set-Cookie', [cookie]);
            res.status(StatusCodes.OK).json({ data: findUser, message: 'login' });
        } catch (error) {
            next(error);
        }
    };

    public logOut = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: IUser = req.body;
            const logOutUserData: IUser = await this.auth.logout(userData);

            res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
            res.status(StatusCodes.OK).json({ data: logOutUserData, message: 'logout' });
        } catch (error) {
            next(error);
        }
    };
}