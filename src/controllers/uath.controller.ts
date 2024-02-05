import { NextFunction, Request, Response } from 'express'

export class AuthController {
    public signUp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(201).json({ data: {}, message: 'signup' });
        } catch (error) {
            next(error);
        }
    };
}