"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const winston_1 = require("./src/util/winston");
const HdController_1 = require("./src/controller/HdController");
const approot = __importStar(require("app-root-path"));
const mongoose_1 = __importDefault(require("mongoose"));
winston_1.logger.debug(`Basedir: ${approot}`);
mongoose_1.default.connect("mongodb://localhost:27017/astro", { useNewUrlParser: true, useUnifiedTopology: true });
const app = express_1.default();
const port = 3000;
// TODO: eventually need to implement some sort of DI container
const controllers = [new HdController_1.HdController()];
controllers.forEach((ctrl) => {
    app.use("/", ctrl.router);
});
app.listen(port, () => {
    winston_1.logger.debug(`Application listening on port ${port}`);
    app._router.stack.forEach((r) => {
        if (r.route && r.route.path) {
            winston_1.logger.debug(`Found route: ${r.route.path}`);
        }
    });
});
