import express, { Request, Response, Router } from "express";
import { logger } from "../util/winston";
import { IHd } from "../model/HD";
import { BaseController } from "./BaseController";
import { HdRepository } from "../repository/HdRepository";
import { IInitializesRoutes } from "./InitializesRoutes";
import { IPagedDataResponse } from "./PagedDataResponse";
import { check, validationResult, ValidationError, Result } from "express-validator";

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
    }

    public initializeRoutes = () : void => {

        logger.debug("Initializing routers for hd");

        this.router.get(`${this.prefix}`, [
            check("id").exists().withMessage("id is mandatory").isNumeric().withMessage("id must be numeric")
        ], this.get);
        this.router.get(`${this.prefix}/count`, this.count);
        this.router.get(`${this.prefix}/getAll`, this.getAll);
        this.router.get(`${this.prefix}/page`, [
            check("start").exists().withMessage("start is mandatory").isNumeric().withMessage("start must be numeric"),
            check("pageSize").exists().withMessage("pageSize is mandatory").isNumeric().withMessage("pageSize must be numeric")
        ], this.page);
    }

    public get = async (req : Request, res : Response) : Promise<void> => {

        logger.debug(`HDController: entered get(), id: ${req.query.id}`);

        const id : number = req.query.id;
        if (!id) {
            res.status(400).send("No id provided");
            return;
        }

        try {
            let result : IHd | null | object = await this.hdRepository.getByNaturalId(id);
            if (result == null) {
                result = {};
            }
            res.json(result);
        } catch (err) {
            res.status(500).send(`Error occurred: ${err}`);
        }
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

    public page = async (req : Request, res : Response) : Promise<void> => {

        logger.debug(`HDController: entered page(), query params: ${JSON.stringify(req.query)}`);

        const start : number = parseInt(req.query.start, 10);
        const pageSize : number = parseInt(req.query.pageSize, 10);
        const field : string = req.query.field;
        const sortDir : number = req.query.sortDir;

        try {
            const count : number = await this.hdRepository.count();
            const items : IHd[] = await this.hdRepository.getPage(start, pageSize, field, sortDir);
            const result : IPagedDataResponse<IHd[]> = {
                result : items,
                start: start,
                stop: start + pageSize,
                totalRecords: count
            };

            res.json(result);
        } catch (err) {
            res.status(500).send(`Error: ${err}`);
        }

    }
}