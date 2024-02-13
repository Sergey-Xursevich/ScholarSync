import {Container} from "typedi";
import {NextFunction, Request, Response} from "express";

import {UserService} from "@services/users.service";
import {IUser} from "@interfaces/users.interface";

export class UserController {
    public user = Container.get(UserService);

    public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: any = req.body;
            const createUserData: IUser = await this.user.createUser(userData);
            res.status(201).json({ data: createUserData, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const users: IUser[] = await this.user.getUser();
            res.status(200).json({ data: users, message: 'received' });
        } catch (err) {
            next(err);
        }
    }

    public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.params.id;
            const data = req.body;
            const updatedUserData = await this.user.updateUser(userId, data);
            res.status(200).json({ data: updatedUserData, message: 'updated' });
        } catch (err) {
            next(err);
        }
    }

    public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.params.id;
            await this.user.deleteUser(userId);
            res.status(200).json({ message: 'deleted' });
        } catch (err) {
            next(err);
        }
    }
}