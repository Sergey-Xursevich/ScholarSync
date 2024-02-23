import {Service} from "typedi";

import {RatingModel} from "@models/ratings.model";
import { IRating } from "@interfaces/ratings.interface";

@Service()
export class RatingsService {
    public async putRating(userData: IRating): Promise<IRating> {
        return await RatingModel.create({ ...userData });
    }
}
