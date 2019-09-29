import express from "express";
import { logger } from "./src/util/winston";
import { HdController } from "./src/controller/HdController";
import { IInitializesRoutes } from "./src/controller/InitializesRoutes";
import * as approot from "app-root-path";
import mongoose from "mongoose";
import { YaleController } from "./src/controller/YaleController";
import { Ngc2000Controller } from "./src/controller/Ngc2000Controller";

logger.debug(`Basedir: ${approot}`);

mongoose.connect("mongodb://localhost:27017/astro", {useNewUrlParser: true, useUnifiedTopology: true});

const app : express.Application = express();
const port : number = 3000;

// TODO: eventually need to implement some sort of DI container
const controllers : IInitializesRoutes[] = [new HdController(), new YaleController(), new Ngc2000Controller()];
controllers.forEach((ctrl : IInitializesRoutes) => {
    app.use("/", ctrl.router);
});

app.listen(port, () => {
    logger.debug(`Application listening on port ${port}`);
    app._router.stack.forEach((r : any) => {
        if (r.route && r.route.path) {
            logger.debug(`Found route: ${r.route.path}`);
        }
    });
});
