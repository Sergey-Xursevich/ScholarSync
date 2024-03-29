import {cleanEnv, str, port} from "envalid";

export const validateEnv = () => {
    cleanEnv(process.env, {
        NODE_ENV: str(),
        PORT: port()
    })
}