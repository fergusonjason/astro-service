import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import approot from "app-root-path";

import { logger } from "./src/util/winston";

import { IInitializesRoutes } from "./src/controller/InitializesRoutes";

import { HdController } from "./src/controller/HdController";
import { YaleController } from "./src/controller/YaleController";
import { Ngc2000Controller } from "./src/controller/Ngc2000Controller";
import { GlieseController } from "./src/controller/GlieseController";

logger.debug(`Basedir: ${approot}`);

mongoose.connect("mongodb://172.17.0.1:27017/astro",
    {useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true});

const app : express.Application = express();
const port : number = 3000;

app.use(morgan("combined"));
app.use(cors);

// TODO: eventually need to implement some sort of DI container
const controllers : IInitializesRoutes[] = [new HdController(), new YaleController(), new Ngc2000Controller(),
        new GlieseController()];
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
