import { INgc2000 } from "../model/Ngc2000";
import { IInitializesRoutes } from "./InitializesRoutes";
import express, { Request, Response} from "express";
import { Ngc2000Repository } from "../repository/Ngc2000Repository";
import { BaseController } from "./BaseController";
import { IPagedDataResponse } from "./PagedDataResponse";
import { logger } from "../util/winston";

export class Ngc2000Controller extends BaseController<INgc2000> implements IInitializesRoutes {

    public router: express.Router;

    private pathPrefix : string = `${this._apiVersion}/ngc2000`;
    private _repository : Ngc2000Repository;

    constructor() {
        super();

        logger.debug("Initializing Ngc2000Controller");
        this.router = express.Router();
        this._repository = new Ngc2000Repository();

        this.initializeRoutes();

        this.router.stack.forEach((item) => {
            if (item.route) {
                logger.debug(`Path: ${item.route.path}, Methods: ${JSON.stringify(item.route.methods)}`);
            }
        });
    }

    public initializeRoutes = () : void => {

        logger.debug("Initializing routers for ngc2000");

        this.router.get(`${this.pathPrefix}`, this.get);
        this.router.get(`${this.pathPrefix}/getAll`, this.getAll);
        this.router.get(`${this.pathPrefix}/count`, this.count);
        this.router.get(`${this.pathPrefix}/page`, this.page);
    }

    public get = async (req : express.Request, res : express.Response): Promise<void> => {

        logger.debug(`Ngc2000Controller: entered get(), id: ${req.query.id}`);

        const id : string = req.query.id;
        const result : INgc2000 | null = await this._repository.getByNaturalId(id);

        res.json(result);
    }

    public getAll = async (req : express.Request, res : express.Response): Promise<void> => {
        throw new Error("Method not implemented.");
    }

    public count = async (req : express.Request, res : express.Response): Promise<void> => {

        const result : number = await this._repository.count();
        res.send(result);
    }

    public page = async (req : express.Request, res : express.Response): Promise<void> => {

        const start : number = Number(req.query.start);
        const end : number = Number(req.query.end);

        const count : number = await this._repository.count();
        const items : INgc2000[] = await this._repository.getPage(start, end);

        const result : IPagedDataResponse<INgc2000[]> = {
            result: items,
            start: start,
            stop : end,
            totalRecords : count
        };

        res.json(result);
    }
}