import { config } from "dotenv";
import {sign} from "jsonwebtoken";

import {IUser} from "@interfaces/users.interface";
import {ITokenData} from "@interfaces/auth.interface";

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, ORIGIN, SECRET_KEY } = process.env;
export const { DB_HOST, DB_PASSWORD } = process.env;

export const createToken = (user: IUser): ITokenData => {
    const dataStoredInToken= { _id: user._id };
    const expiresIn = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
}