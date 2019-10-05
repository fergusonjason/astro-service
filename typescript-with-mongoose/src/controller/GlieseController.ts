import { BaseController } from "./BaseController";
import { IGliese } from "../model/Gliese";
import { IInitializesRoutes } from "./InitializesRoutes";
import { GlieseRepository } from "../repository/GlieseRepository";
import express, { Router } from "express";
import { IPagedDataResponse } from "../model/PagedDataResponse";
import { logger } from "../util/winston";

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
    }

    public initializeRoutes(): void {

        logger.debug("Initializing routers for yale");

        this.router.get(`${this.prefix}/count`, this.count);
        this.router.get(`${this.prefix}`, this.get);
        this.router.get(`${this.prefix}/getAll`, this.getAll);
        this.router.get(`${this.prefix}/page`, this.page);
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

        const start : number = Number(req.query.start);
        const end : number = Number(req.query.end);

        const count : number = await this.repository.count();
        const items : IGliese[] = await this.repository.getPage(start, end);

        const result : IPagedDataResponse<IGliese[]> = {
            result : items,
            start : start,
            stop : end,
            totalRecords : count
        };

        res.json(result);
    }
}