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

    private prefix : string = `${this._apiVersion}/hd`;
    private hdRepository : HdRepository;

    constructor() {
        super();

        logger.debug("Initializing HdController");
        this.router = express.Router();
        this.hdRepository = new HdRepository();

        this.initializeRoutes();

        this.router.stack.forEach((item) => {
            if (item.route) {
                logger.debug(`Path: ${item.route.path}, Methods: ${JSON.stringify(item.route.methods)}`);
            }
        });
    }

    public initializeRoutes = () : void => {

        logger.debug("Initializing routers for hd");

        this.router.get(`${this.prefix}`, [
            check("id").exists().withMessage("id is mandatory").isNumeric().withMessage("id must be numeric")
        ], this.get);
        this.router.get(`${this.prefix}/count`, this.count);
        this.router.get(`${this.prefix}/getAll`, this.getAll);
        this.router.get(`${this.prefix}/page`, this.page);
    }

    public getRepository = () : BaseRepository<IHd> => {
        return this.hdRepository;
    }

    public getNaturalIdField = () : string => {
        return "HD";
    }

    public getAll = async (req : Request, res : Response) : Promise<void> => {

        logger.debug(`HDController: entered getAll()`);

        try {
            let result : IHd[] | null = await this.hdRepository.getAll();
            if (result == null) {
                result = [];
            }

            res.json(result);
        } catch (err) {
            res.status(500).send(`Error occurred: ${err}`);
        }
    }

    public count = async (req : Request, res : Response) : Promise<void> => {

        logger.debug("HdController: entered count()");

        try {
            const count : number = await this.hdRepository.count();
            const result : object = {count : count};
            res.send(result);
        } catch (err) {
            res.status(500).send(`Error: ${err}`);
        }

    }

}