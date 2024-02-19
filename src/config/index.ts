import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, ORIGIN, SECRET_KEY } = process.env;
export const { DB_HOST, DB_PASSWORD } = process.env;