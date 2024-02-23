import App from "@/app";
import {validateEnv} from "@utils/validateEnv";

import {AuthRoute} from "@routes/auth.route";
import {UserRoute} from "@routes/users.route";
import {RatingsRoute} from "@routes/ratings.route";
import {CoursesRoute} from "@routes/course.route";


validateEnv();

const app = new App([
    new AuthRoute(),
    new UserRoute(),
    new RatingsRoute(),
    new CoursesRoute()
]);

app.listen();