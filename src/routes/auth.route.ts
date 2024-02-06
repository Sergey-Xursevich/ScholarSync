import {Router} from "express";
import { Routes } from "@interfaces/routes.interface";
import {AuthController} from "@controllers/uath.controller";

export class AuthRoute implements Routes {
    public router = Router();
    public auth = new AuthController();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post('/signup', () => {}, this.auth.signUp);
    }
}