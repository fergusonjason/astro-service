import express, { Request, Response, Router } from "express";
import { logger } from "../util/winston";
import { IHd } from "../model/HD";
import { BaseController } from "./BaseController";
import { HdRepository } from "../repository/HdRepository";
import { IInitializesRoutes } from "./InitializesRoutes";

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

        this.router.get(`${this.prefix}/count`, this.count);
        this.router.get(`${this.prefix}/get`, this.get);
        this.router.get(`${this.prefix}/getAll`, this.getAll);
        this.router.get(`${this.prefix}/page`, this.page);
        this.router.get(`${this.prefix}/getByHd`, this.getByHdNumber);
    }

    public count = async (req : Request, res : Response) : Promise<void> => {

        logger.debug("HdController: entered count()");

        const count : number = await this.hdRepository.count();

        const result : object = {count : count};

        res.send(result);

    }

    public getByHdNumber = async (req : Request, res : Response) : Promise<void> => {

        logger.debug("HDController: Entered getByHdNumber");

        const hdNumber : number = parseInt(req.query.hdNumber, 10);

        try {
            const result : IHd | null = await this.hdRepository.getByHdNumber(hdNumber);
            res.json(result);
        } catch (err) {
            res.send(`Error occurred: ${err}`);
        }

    }

    public get = async (req : Request, res : Response) : Promise<void> => {

    }

    public getAll = (req : Request, res : Response) : void => {

    }

    public page = (req : Request, res : Response) : void => {

    }

    private initStore = () : void => {

    }
}