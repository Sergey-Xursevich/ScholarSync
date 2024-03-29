import express from "express";
import cors from "cors";

import {Routes} from "@interfaces/routes.interface";
import {dbConnection} from "@database";
import {NODE_ENV, PORT, ORIGIN, CREDENTIALS} from "@config";
import {ErrorMiddleware} from "@/middleware/error.middleware";

class App {
    public app: express.Application;
    public env: string;
    public port: string | number;

    constructor(routes: Routes[]) {
        this.app = express();
        this.env = NODE_ENV || 'development';
        this.port = PORT || 3000;

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`=================================`);
            console.log(`======= ENV: ${this.env} =======`);
            console.log(`🚀 App listening on the port ${this.port}`);
            console.log(`=================================`);
        });
    }

    private async connectToDatabase() {
        await dbConnection();
    }

    private async initializeMiddlewares() {
        this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private async initializeRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app.use('/v1/', route.router);
        });
    }

    private initializeErrorHandling() {
        this.app.use(ErrorMiddleware)
    }
 }

export default App;