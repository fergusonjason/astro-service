import express, { Request, Response, Router } from "express";
import { check, validationResult, ValidationError, Result } from "express-validator";

import { logger } from "../util/winston";

import { IYale } from "../model/Yale";
import { IInitializesRoutes } from "./InitializesRoutes";

import { BaseController } from "./BaseController";

import { YaleRepository } from "../repository/YaleRepository";
import { BaseRepository } from "../repository/BaseRepository";

export class YaleController extends BaseController<IYale> implements IInitializesRoutes {

    public router : Router;

    private prefix : string = `${this._apiVersion}/yale`;
    private repository : YaleRepository;

    constructor() {
        super();

        logger.debug("Initializing YaleController");

        this.router = express.Router();
        this.repository = new YaleRepository();

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
        this.router.get(`${this.prefix}`, [
            check("id").exists().withMessage("id is mandatory").isNumeric().withMessage("id must be numeric")
        ], this.get);
        this.router.get(`${this.prefix}/getAll`, this.getAll);
        this.router.get(`${this.prefix}/page`, this.page);
    }

    public getRepository = () : BaseRepository<IYale> => {
        return this.repository;
    }

    public getNaturalIdField = () : string => {
        return "HR";
    }

    public getAll(req : Request, res : Response): void {
        res.status(400).send("getAll is a bad idea");
    }
}