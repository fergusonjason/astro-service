import { BaseController } from "./BaseController";
import { IGliese } from "../model/Gliese";
import { IInitializesRoutes } from "./InitializesRoutes";
import { GlieseRepository } from "../repository/GlieseRepository";
import express, { Router } from "express";
import { IPagedDataResponse } from "./PagedDataResponse";
import { logger } from "../util/winston";
import { check, validationResult, ValidationError, Result } from "express-validator";

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
        this.router.get(`${this.prefix}/page`, [
            check("start").exists().withMessage("start is mandatory").isNumeric().withMessage("start must be numeric"),
            check("end").exists().withMessage("end is mandatory").isNumeric().withMessage("end must be numeric"),
            check("field").exists().withMessage("sortfield must be specified")
        ], this.page);
    }

    public count = async (req : express.Request, res : express.Response): Promise<void> => {

        logger.debug("GlieseController: entered count()");
        const result : number = await this.repository.count();
        res.send(result);
    }

    public get = async (req : express.Request, res : express.Response): Promise<void> => {

        logger.debug(`GlieseController: entered get(): id ${req.query.id}`);

        const result : IGliese[] | null = await this.repository.getByName(req.query.id);
        res.json(result);
    }

    public getAll = async (req : express.Request, res : express.Response): Promise<void> => {
        throw new Error("Method not implemented.");
    }

    public page = async (req : express.Request, res : express.Response): Promise<void> => {

        throw new Error("Method not implemented.");

        // logger.debug(`GlieseController: entered page(), params: ${JSON.stringify(req.query)}`);

        // const errors : Result<ValidationError> = validationResult(req);
        // if (!errors.isEmpty()) {
        //     logger.debug("Errors found");
        //     res.status(400).json({errors: errors.array()});
        //     return;
        // }

        // const start : number = parseInt(req.query.start, 10);
        // const end : number = parseInt(req.query.end, 10);
        // const field : string = req.query.field;
        // const sortDir : number = parseInt(req.query.sortDir, 10);

        // const count : number = await this.repository.count();
        // const items : IGliese[] = await this.repository.getPage(start, end, field, sortDir);

        // const result : IPagedDataResponse<IGliese[]> = {
        //     result : items,
        //     start : start,
        //     stop : end,
        //     totalRecords : count
        // };

        // res.json(result);
    }
}