import {Container} from "typedi";
import {NextFunction, Request, Response,} from "express";
import {StatusCodes, ReasonPhrases} from "http-status-codes";

import {CoursesService} from "@services/courses.service";
import {ICourse} from "@interfaces/courses.interface";

export class CoursesController {
    public courses = Container.get(CoursesService);

    public createCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: any = req.body;
            const createCourseData: ICourse = await this.courses.createCourse(userData);
            res.status(StatusCodes.CREATED).json({ data: createCourseData, message: ReasonPhrases.CREATED });
        } catch (error) {
            next(error)
        }
    }

    public getCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const courseId: string | undefined = req.params.id;
            const courseData: ICourse | ICourse[] = await this.courses.getCourse(courseId);
            res.status(StatusCodes.OK).json({ data: courseData, message: ReasonPhrases.OK });
        } catch (error) {
            next(error)
        }
    }

    public deleteCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const courseId: string = req.params.id;
            await this.courses.deleteCourse(courseId);
            res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
        } catch (error) {
            next(error)
        }
    }

    public updateCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const courseId: string = req.params.id;
            const data = req.body;
            const updatedCourseData = await this.courses.updateCourse(courseId, data);
            res.status(StatusCodes.OK).json({ data: updatedCourseData, message:  ReasonPhrases.OK });
        } catch (error) {
            next(error)
        }
    }
}