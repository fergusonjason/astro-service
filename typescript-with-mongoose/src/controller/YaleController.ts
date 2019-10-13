import express, { Request, Response, Router } from "express";
import { check, validationResult, ValidationError, Result } from "express-validator";

import { logger } from "../util/winston";

import { IYale } from "../model/Yale";
import { IInitializesRoutes } from "./InitializesRoutes";
import { IPagedDataResponse } from "./PagedDataResponse";

import { BaseController } from "./BaseController";

import { YaleRepository } from "../repository/YaleRepository";

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
        try {
            const result : IYale | null = await this.repository.getByNaturalId(id);
            res.json(result);
        } catch (err) {
            res.status(400).send(`Error: ${err}`);
            return;
        }

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

        const numericFields : string[] = ["HR", "Vmag", "BV"];

        const start : number = parseInt(req.query.start, 10);
        const pageSize : number = parseInt(req.query.pageSize, 10);
        const field : string = req.query.field;
        const sortDir : number = parseInt(req.query.sortDir, 10);
        const filterOp : string = req.query.filterOp;
        let filterVal : number | string;
        if (numericFields.indexOf(field) > -1) {
            filterVal = parseInt(req.query.filterVal, 10);
        } else {
            filterVal = req.query.filterVal;
        }

        let count : number;
        try {
            count = await this.repository.count();
        } catch (err) {
            res.status(400).json(JSON.stringify(err));
            return;
        }

        try {
            const items : IYale[] = await this.repository.getPage(start, pageSize, field,
                                                                   sortDir, filterOp, filterVal);

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