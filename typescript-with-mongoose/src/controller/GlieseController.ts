import { BaseController } from "./BaseController";
import { IGliese } from "../model/Gliese";
import { IInitializesRoutes } from "./InitializesRoutes";
import { GlieseRepository } from "../repository/GlieseRepository";
import express, { Router } from "express";
import { logger } from "../util/winston";
import { check, validationResult, ValidationError, Result } from "express-validator";
import { BaseRepository } from "../repository/BaseRepository";

export class GlieseController extends BaseController<IGliese> implements IInitializesRoutes {

    public router : Router;

    private _prefix : string = `${this._apiVersion}/gliese`;
    private _repository : GlieseRepository;

    constructor() {
        super();

        logger.debug("Initializing YaleController");

        this.router = express.Router();
        this._repository = new GlieseRepository();

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

    public getRepository = () : BaseRepository<IGliese> => {
        return this._repository;
    }

    public getNaturalIdField = () : string => {
        return "name";
    }

    public getAll = async (req : express.Request, res : express.Response): Promise<void> => {
        throw new Error("Method not implemented.");
    }
}