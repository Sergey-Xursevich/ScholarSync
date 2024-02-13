import {Router} from "express";

import {Routes} from "@interfaces/routes.interface";
import {RatingsController} from "@controllers/routers.controller";

export class RatingsRoute implements Routes {
    public path = "/ratings";
    public router = Router();
    public rating = new RatingsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, this.rating.putRating)
    }
}