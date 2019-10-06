import { IYale } from "../model/Yale";
import { BaseController } from "./BaseController";
import { IInitializesRoutes } from "./InitializesRoutes";
import { YaleRepository } from "../repository/YaleRepository";
import { IPagedDataResponse } from "../model/PagedDataResponse";
import { logger } from "../util/winston";
import { check, validationResult, ValidationError, Result } from "express-validator";

import express, { Request, Response, Router } from "express";

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
    }

    public initializeRoutes(): void {

        logger.debug("Initializing routers for yale");

        this.router.get(`${this.prefix}/count`, this.count);
        this.router.get(`${this.prefix}`, [
            check("id").exists().withMessage("id is mandatory").isNumeric().withMessage("id must be numeric")
        ], this.get);
        this.router.get(`${this.prefix}/getAll`, this.getAll);
        this.router.get(`${this.prefix}/page`, [
            check("start").exists().withMessage("start is mandatory").isNumeric().withMessage("start must be numeric"),
            check("pageSize").exists().withMessage("pageSize is mandatory").isNumeric().withMessage("pageSize must be numeric")
        ], this.page);
    }

    public count = async (req : Request, res : Response): Promise<void> => {

        logger.debug("YaleController: entered count()");

        const count : number = await this.repository.count();
        res.send(count);
    }

    public get = async (req : Request, res : Response): Promise<void> => {

        logger.debug(`YaleController: entered get(): id: ${req.query.id}`);

        const errors : Result<ValidationError> = validationResult(req);
        if (!errors.isEmpty()) {
            logger.debug(`Errors found: ${JSON.stringify(errors.array())}`);
            res.status(400).json({errors: errors.array()});
            return;
        }

        const id : number = req.query.id;
        const result : IYale | null = await this.repository.getById(id);

        res.json(result);
    }

    public getAll(req : Request, res : Response): void {
        res.status(400).send("getAll is a bad idea");
    }

    public page = async (req : Request, res : Response): Promise<void> => {

        logger.debug(`YaleController: entered page(), query params: ${JSON.stringify(req.query)}`);

        const errors : Result<ValidationError> = validationResult(req);
        if (!errors.isEmpty()) {
            logger.debug("Errors found");
            res.status(400).json({errors: errors.array()});
            return;
        }

        const start : number = parseInt(req.query.start, 10);
        const pageSize : number = parseInt(req.query.pageSize, 10);
        const field : string = req.query.field;
        const sortDir : number = req.query.sortDir;

        const count : number = await this.repository.count();

        try {
            const items : IYale[] = await this.repository.getPage(start, pageSize, field, sortDir);

            const result : IPagedDataResponse<IYale[]> = {
                result : items,
                start : start,
                stop : start + pageSize,
                totalRecords : count
            };

            res.json(result);
        } catch (err) {

            res.status(400).json(JSON.stringify(err));
        }

    }
}