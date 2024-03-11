import {Router} from "express";

import { Routes } from "@interfaces/routes.interface";
import {AuthController} from "@controllers/auth.controller";
import {AuthMiddleware} from "@middleware/auth.middleware";
import {userCreatingValidationRules, validate} from "@middleware/validation.middleware";

export class AuthRoute implements Routes {
    public router = Router();
    public auth = new AuthController();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post('/signup', userCreatingValidationRules(), validate, this.auth.signUp);
        this.router.post('/login', userCreatingValidationRules(), validate, this.auth.logIn);
        this.router.post('/logout', AuthMiddleware, this.auth.logOut);
    }
}