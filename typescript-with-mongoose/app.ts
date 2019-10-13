import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import approot from "app-root-path";
import fs from "fs";

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

mongoose.connection.on("connected", () => {
    logger.debug("MongoDB connected");
});

mongoose.connection.on("disconnected", () => {
    logger.debug("MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
    logger.debug(`MongoDB error: ${err}`);
});

process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        logger.debug("Mongoose default connection disconnected through app termination");
        process.exit(0);
    });
});

const timestamp : string = fs.readFileSync("buildtime.txt").toString();
logger.debug(`Build: ${timestamp}`);

const app : express.Application = express();
const port : number = 3000;

app.use(morgan("combined"));

app.use((req, res, next): void => {
    logger.debug("Configuring CORS to allow all origins");
    res.header("Access-Control-Allow-Origin", "*"); // this is probably dangerous in prod
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// TODO: eventually need to implement some sort of DI container
const controllers : IInitializesRoutes[] = [new HdController(), new YaleController(), new Ngc2000Controller(),
        new GlieseController()];
controllers.forEach((ctrl : IInitializesRoutes) => {
    app.use("/", ctrl.router);
});

app.listen(port, () => {
    logger.debug(`Application listening on port ${port}`);
});
