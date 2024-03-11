import {Router} from "express";

import {Routes} from "@interfaces/routes.interface";
import {AuthMiddleware} from "@middleware/auth.middleware";
import {UserController} from "@controllers/users.controller";
import {
    userCreatingValidationRules,
    userUpdatingValidationRules,
    validate
} from "@middleware/validation.middleware";

export class UserRoute implements Routes {
    public path = "/users";
    public router = Router();
    public user = new UserController();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, AuthMiddleware, userCreatingValidationRules(), validate, this.user.createUser);
        this.router.get(`${this.path}`, AuthMiddleware, this.user.getUser);
        this.router.put(`${this.path}/:id`, AuthMiddleware, userUpdatingValidationRules(), validate, this.user.updateUser);
        this.router.delete(`${this.path}/:id`, AuthMiddleware, this.user.deleteUser);
    }
}