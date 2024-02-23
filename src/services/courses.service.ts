import {Service} from "typedi";
import {StatusCodes} from "http-status-codes";

import {CourseModel} from "@models/courses.model";
import {ICourse} from "@interfaces/courses.interface";
import {HttpException} from "@exceptions/HttpException";

@Service()
export class CoursesService {
    public async createCourse(userData: ICourse): Promise<ICourse> {
        return await CourseModel.create({...userData});
    }

    public async getCourse(id: string | undefined): Promise<ICourse | ICourse[]> {
        if (typeof (id) === 'string') {
            const findCourse: ICourse = await CourseModel.findById(id);

            if (!findCourse) {
                throw new HttpException(StatusCodes.NOT_FOUND, `This course doesn't exists`);
            }

            return await CourseModel.findById(id)
        } else {
            return await CourseModel.find();
        }
    }

    public async updateCourse(id: string, data: {
        title: string,
        description: string,
        tags: Array<string>
    }): Promise<ICourse> {

        const findCourse: ICourse = await CourseModel.findById(id);

        if (!findCourse) {
            throw new HttpException(StatusCodes.NOT_FOUND, `This course doesn't exists`);
        }

        return await CourseModel.findByIdAndUpdate(id, data, {returnDocument: "after"});
    }

    public async deleteCourse(id: string): Promise<void> {

        const findCourse: ICourse = await CourseModel.findById(id);

        if (!findCourse) {
            throw new HttpException(StatusCodes.NOT_FOUND, `This course doesn't exists`);
        }

        await CourseModel.findByIdAndDelete(id);
    }
}