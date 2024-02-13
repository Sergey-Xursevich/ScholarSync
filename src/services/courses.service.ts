import {Service} from "typedi";
import {HttpException} from "@exceptions/HttpException";

import {CourseModel} from "@models/courses.model";
import {ICourse} from "@interfaces/courses.interface";

@Service()
export class CoursesService {
    public async createCourse(userData: ICourse): Promise<ICourse> {
        try {
            return await CourseModel.create({ ...userData });
        } catch (err) {
            throw new HttpException(400, err);
        }
    }

    public async getCourse(id: string | undefined): Promise<ICourse | ICourse[]> {
        try {
            if (typeof(id) === 'string') {
                const findCourse: ICourse = await CourseModel.findById(id);

                if (!findCourse) {
                    throw new HttpException(404, `This course doesn't exists`);
                }

                return await CourseModel.findById(id)
            } else {
                return await CourseModel.find();
            }
        } catch (err) {
            throw new HttpException(400, err);
        }
    }

    public async updateCourse(id: string, data: { title: string, description: string, tags: Array<string> }): Promise<ICourse> {
        try {
            const findCourse: ICourse = await CourseModel.findById(id);

            if (!findCourse) {
                throw new HttpException(404, `This course doesn't exists`);
            }

            return await CourseModel.findByIdAndUpdate(id, data, { returnDocument: "after"});
        } catch (err) {
            throw new HttpException(400, err);
        }
    }

    public async deleteCourse(id: string): Promise<void> {
        try {
            const findCourse: ICourse = await CourseModel.findById(id);

            if (!findCourse) {
                throw new HttpException(404, `This course doesn't exists`);
            }

            await CourseModel.findByIdAndDelete(id);
        } catch (err) {
            throw new HttpException(400, err);
        }
    }
}