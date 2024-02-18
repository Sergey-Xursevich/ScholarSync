import {Container} from "typedi";
import {NextFunction, Request, Response} from "express";
import {ReasonPhrases, StatusCodes} from "http-status-codes";

import {UserService} from "@services/users.service";
import {IUser} from "@interfaces/users.interface";

export class UserController {
    public user = Container.get(UserService);

    public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: any = req.body;
            const createUserData: IUser = await this.user.createUser(userData);
            res.status(StatusCodes.CREATED).json({ data: createUserData, message: ReasonPhrases.CREATED });
        } catch (error) {
            next(error);
        }
    };

    public getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const users: IUser[] = await this.user.getUser();
            res.status(StatusCodes.OK).json({ data: users, message: ReasonPhrases.OK });
        } catch (err) {
            next(err);
        }
    }

    public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.params.id;
            const data = req.body;
            const updatedUserData = await this.user.updateUser(userId, data);
            res.status(StatusCodes.OK).json({ data: updatedUserData, message: ReasonPhrases.OK });
        } catch (err) {
            next(err);
        }
    }

    public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.params.id;
            await this.user.deleteUser(userId);
            res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
        } catch (err) {
            next(err);
        }
    }
}