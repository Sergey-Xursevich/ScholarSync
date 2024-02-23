import {StatusCodes} from "http-status-codes";
import {body, validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";

import {Role} from "@interfaces/users.interface";
import {Difficulty} from "@interfaces/courses.interface";

export const userCreatingValidationRules = () => {
    return [
        body('username').isString(),
        body('password').isLength({ min: 5 }),
        body('role').isIn([Role.User, Role.Author, Role.Admin]),
        body('availableCourses').optional().isArray()
    ]
}

export const userUpdatingValidationRules = () => {
    return [
        body('username').optional().isString(),
        body('password').optional().isLength({ min: 5 }),
        body('role').optional().isIn([Role.User, Role.Author, Role.Admin]),
        body('availableCourses').optional().isArray()
    ]
}

export const courseCreatingValidationRules = () => {
    return [
        body('title').isString(),
        body('description').isString(),
        body('difficulty').isIn([Difficulty.Easy, Difficulty.Medium, Difficulty.Hard]),
        body('tags').optional().isArray(),
        body('additionalMaterials').optional().isArray(),
        body('comments').optional().isArray(),
    ]
}

export const courseUpdatingValidationRules = () => {
    return [
        body('title').optional().isString(),
        body('description').optional().isString(),
        body('difficulty').optional().isIn([Difficulty.Easy, Difficulty.Medium, Difficulty.Hard]),
        body('tags').optional().isArray(),
        body('additionalMaterials').optional().isArray(),
        body('comments').optional().isArray(),
    ]
}

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = []
    errors.array().forEach(err => {
        if (err.type === 'field') {
            extractedErrors.push({ field: err.path, message: err.msg })
        } else {
            extractedErrors.push({ field: err.type, message: err.msg })
        }
    });

    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        errors: extractedErrors,
    })
}
