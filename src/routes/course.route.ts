import {Routes} from "@interfaces/routes.interface";
import {Router} from "express";
import {CoursesController} from "@controllers/courses.controller";

export class CoursesRoute implements Routes {
    public path = '/courses'
    public router = Router();
    public course = new CoursesController();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, this.course.createCourse);
        this.router.get(`${this.path}/:id?`, this.course.getCourse);
        this.router.delete(`${this.path}/:id`, this.course.deleteCourse);
        this.router.put(`${this.path}/:id`, this.course.updateCourse);
    }
}