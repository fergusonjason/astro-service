import express, { Router } from "express";

import { logger } from "../util/winston";

import { IGliese2 } from "../model/Gliese2";
import { BaseController } from "./BaseController";
import { IInitializesRoutes } from "./InitializesRoutes";
import { Gliese2Repository } from "../repository/Gliese2Repository";
import { BaseRepository } from "../repository/BaseRepository";

export class Gliese2Controller extends BaseController<IGliese2> implements IInitializesRoutes {

    public router : Router;

    private _prefix : string = `${this._apiVersion}/gliese2`;
    private _repository : Gliese2Repository;

    constructor() {
        super();

        logger.debug("Initializing YaleController");

        this.router = express.Router();
        this._repository = new Gliese2Repository();

        this.initializeRoutes();

        this.router.stack.forEach((item) => {
            if (item.route) {
                logger.debug(`Path: ${item.route.path}, Methods: ${JSON.stringify(item.route.methods)}`);
            }
        });
    }

    public initializeRoutes(): void {

        logger.debug("Initializing routers for yale");

        this.router.get(`${this._prefix}/count`, this.count);
        this.router.get(`${this._prefix}`, this.get);
        this.router.get(`${this._prefix}/getAll`, this.getAll);
        this.router.get(`${this._prefix}/page`, this.page);
    }

    public getRepository = () : BaseRepository<IGliese2> => {
        return this._repository;
    }

    public getNaturalIdField = () : string => {
        return "name";
    }

    public getAll = async (req : express.Request, res : express.Response): Promise<void> => {
        throw new Error("Method not implemented.");
    }
}