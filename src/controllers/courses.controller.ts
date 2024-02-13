import {Container} from "typedi";
import {NextFunction, Request, Response,} from "express";

import {CoursesService} from "@services/courses.service";
import {ICourse} from "@interfaces/courses.interface";

export class CoursesController {
    public courses = Container.get(CoursesService);

    public createCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: any = req.body;
            const createCourseData: ICourse = await this.courses.createCourse(userData);
            res.status(201).json({ data: createCourseData, message: 'created' });
        } catch (error) {
            next(error)
        }
    }

    public getCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const courseId: string | undefined = req.params.id;
            const courseData: ICourse | ICourse[] = await this.courses.getCourse(courseId);
            res.status(200).json({ data: courseData, message: 'received' });
        } catch (error) {
            next(error)
        }
    }

    public deleteCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const courseId: string = req.params.id;
            await this.courses.deleteCourse(courseId);
            res.status(200).json({ message: 'deleted' });
        } catch (error) {
            next(error)
        }
    }

    public updateCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const courseId: string = req.params.id;
            const data = req.body;
            const updatedCourseData = await this.courses.updateCourse(courseId, data);
            res.status(200).json({ data: updatedCourseData, message: 'updated' });
        } catch (error) {
            next(error)
        }
    }
}