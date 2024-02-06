import { Routes } from "@interfaces/routes.interface";
import {Router} from "express";

export class UserRoute implements Routes {
    public path = "/users";
    public router = Router();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post('/signup', () => {}, () => {});
    }
}