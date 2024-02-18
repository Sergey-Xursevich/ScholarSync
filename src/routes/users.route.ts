import {Router} from "express";

import {Routes} from "@interfaces/routes.interface";
import {UserController} from "@controllers/users.controller";
import {
    userCreatingValidationRules,
    userUpdatingValidationRules,
    validate
} from "@/middleware/validation.middleware";

export class UserRoute implements Routes {
    public path = "/users";
    public router = Router();
    public user = new UserController();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, userCreatingValidationRules(), validate, this.user.createUser);
        this.router.get(`${this.path}`, this.user.getUser);
        this.router.put(`${this.path}/:id`, userUpdatingValidationRules(), validate, this.user.updateUser);
        this.router.delete(`${this.path}/:id`, this.user.deleteUser);
    }
}