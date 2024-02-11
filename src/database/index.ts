import { connect, set } from 'mongoose';
import { NODE_ENV, DB_HOST, DB_PASSWORD } from '@/config';
import * as console from "console";

export const dbConnection = async () => {
    const dbConfig = {
        url: `mongodb+srv://${DB_HOST}:${DB_PASSWORD}@cluster0.ahzmgoc.mongodb.net/?retryWrites=true&w=majority`,
        options: {
            dbName: 'scholarSync'
        }
    };

    if (NODE_ENV !== 'production') {
        set('debug', true);
    }

    try {
        await connect(dbConfig.url, dbConfig.options)
    } catch (err) {
        console.error(err);
    }
};
