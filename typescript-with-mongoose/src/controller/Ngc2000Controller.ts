import { INgc2000 } from "../model/Ngc2000";
import { IInitializesRoutes } from "./InitializesRoutes";
import express, { Request, Response} from "express";
import { Ngc2000Repository } from "../repository/Ngc2000Repository";
import { BaseController } from "./BaseController";
import { IPagedDataResponse } from "../model/PagedDataResponse";

export class Ngc2000Controller extends BaseController<INgc2000> implements IInitializesRoutes {

    public router: express.Router;

    private pathPrefix : string = `${this._apiVersion}/ngc2000`;
    private _repository : Ngc2000Repository;

    constructor() {
        super();

        this.router = express.Router();
        this._repository = new Ngc2000Repository();
    }

    public initializeRoutes = () : void => {

        this.router.get(`${this.pathPrefix}/count`, this.count);
        this.router.get(`${this.pathPrefix}/get`, this.get);
        this.router.get(`${this.pathPrefix}/getAll`, this.getAll);
        this.router.get(`${this.pathPrefix}/page`, this.page);
    }

    public count = async (req : express.Request, res : express.Response): Promise<void> => {

        const result : number = await this._repository.count();
        res.send(result);
    }

    public get = async (req : express.Request, res : express.Response): Promise<void> => {

        const id : string = req.query.id;
        const result : INgc2000 | null = await this._repository.getById(id);

        res.json(result);
    }

    public getAll = async (req : express.Request, res : express.Response): Promise<void> => {
        throw new Error("Method not implemented.");
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