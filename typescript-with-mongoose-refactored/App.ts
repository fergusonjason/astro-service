import express from "express";
import mongoose from "mongoose";

import fs from "fs";

import { logger } from "./src/util/Logger";
import { HDController } from "./src/controller/HDController";
import { IController } from "./src/controller/Controller";
import { YaleController } from "./src/controller/YaleController";
import { Ngc2000Controller } from "./src/controller/Ngc2000";
import { GlieseController } from "./src/controller/GlieseController";


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

app.use((req, res, next): void => {
    logger.debug("Configuring CORS to allow all origins");
    res.header("Access-Control-Allow-Origin", "*"); // this is probably dangerous in prod
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const controllers : IController[] = [new HDController(), new YaleController(), new Ngc2000Controller(), new GlieseController()];
controllers.forEach((ctrl : IController) => {
    app.use("/", ctrl.getRouter());
});

app.listen(port, () => {
    logger.debug(`Application listening on port ${port}`);
});
