import { INgc2000 } from "../model/Ngc2000";
import { IInitializesRoutes } from "./InitializesRoutes";
import express, { Request, Response} from "express";
import { Ngc2000Repository } from "../repository/Ngc2000Repository";
import { BaseController } from "./BaseController";
import { logger } from "../util/winston";
import { BaseRepository } from "../repository/BaseRepository";

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

    public getRepository = () : BaseRepository<INgc2000> => {
        return this._repository;
    }

    public getNaturalIdField = () : string => {
        return "name";
    }

    public getAll = async (req : Request, res : Response): Promise<void> => {
        throw new Error("Method not implemented.");
    }

    public count = async (req : Request, res : Response): Promise<void> => {

        const result : number = await this._repository.count();
        res.send(result);
    }

}