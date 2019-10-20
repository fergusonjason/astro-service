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

    private prefix : string = `${this._apiVersion}/gliese`;
    private repository : GlieseRepository;

    constructor() {
        super();

        logger.debug("Initializing YaleController");

        this.router = express.Router();
        this.repository = new GlieseRepository();

        this.initializeRoutes();

        this.router.stack.forEach((item) => {
            if (item.route) {
                logger.debug(`Path: ${item.route.path}, Methods: ${JSON.stringify(item.route.methods)}`);
            }
        });
    }

    public initializeRoutes(): void {

        logger.debug("Initializing routers for yale");

        this.router.get(`${this.prefix}/count`, this.count);
        this.router.get(`${this.prefix}`, this.get);
        this.router.get(`${this.prefix}/getAll`, this.getAll);
        this.router.get(`${this.prefix}/page`, this.page);
    }

    public getRepository = () : BaseRepository<IGliese> => {
        return this.repository;
    }

    public getNaturalIdField = () : string => {
        return "name";
    }

    public count = async (req : express.Request, res : express.Response): Promise<void> => {

        logger.debug("GlieseController: entered count()");
        const result : number = await this.repository.count();
        res.send(result);
    }

    public getAll = async (req : express.Request, res : express.Response): Promise<void> => {
        throw new Error("Method not implemented.");
    }
}