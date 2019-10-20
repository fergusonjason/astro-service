import express, { Request, Response, Router } from "express";
import { check, validationResult, ValidationError, Result } from "express-validator";

import { logger } from "../util/winston";
import { BaseController } from "./BaseController";
import { HdRepository } from "../repository/HdRepository";

import { IHd } from "../model/HD";
import { IInitializesRoutes } from "./InitializesRoutes";

import { BaseRepository } from "../repository/BaseRepository";

export class HdController extends BaseController<IHd> implements IInitializesRoutes {

    public router : Router;

    private _prefix : string = `${this._apiVersion}/hd`;
    private _repository : HdRepository;

    constructor() {
        super();

        logger.debug("Initializing HdController");
        this.router = express.Router();
        this._repository = new HdRepository();

        this.initializeRoutes();

        this.router.stack.forEach((item) => {
            if (item.route) {
                logger.debug(`Path: ${item.route.path}, Methods: ${JSON.stringify(item.route.methods)}`);
            }
        });
    }

    public initializeRoutes = () : void => {

        logger.debug("Initializing routers for hd");

        this.router.get(`${this._prefix}`, [
            check("id").exists().withMessage("id is mandatory").isNumeric().withMessage("id must be numeric")
        ], this.get);
        this.router.get(`${this._prefix}/count`, this.count);
        this.router.get(`${this._prefix}/getAll`, this.getAll);
        this.router.get(`${this._prefix}/page`, this.page);
    }

    public getRepository = () : BaseRepository<IHd> => {
        return this._repository;
    }

    public getNaturalIdField = () : string => {
        return "HD";
    }

    public getAll = async (req : Request, res : Response) : Promise<void> => {

        logger.debug(`HDController: entered getAll()`);

        try {
            let result : IHd[] | null = await this._repository.getAll();
            if (result == null) {
                result = [];
            }

            res.json(result);
        } catch (err) {
            res.status(500).send(`Error occurred: ${err}`);
        }
    }

}