import {Container} from "typedi";
import {NextFunction, Request, Response} from "express";

import {RatingsService} from "@services/ratings.service";
import {IRating} from "@interfaces/ratings.interface";

export class RatingsController {
    public ratings = Container.get(RatingsService);

    public putRating = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: any = req.body;
            const createRatingData: IRating = await this.ratings
                .putRating(userData);
            res.status(201).json({ data: createRatingData, message: 'created' });
        } catch (error) {
            next(error);
        }
    };
}