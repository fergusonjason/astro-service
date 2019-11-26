import express, {Router} from "express";

import { BaseController } from "./BaseController";

import { IHD, naturalId } from "../model/HD";
import { HDRepository } from "../repository/HDRepository";
import { IController } from "./Controller";

export class HDController extends BaseController<IHD> implements IController {

    private router: Router;

    private _repository: HDRepository;

    private _prefix : string = `${this._apiVersion}/hd`;

    constructor() {
        super();

        this.router = express.Router();
        this._repository = new HDRepository();

        // TODO: Add express validator to ensure the page and pageSize exist and are numbers
        this.router.get(`${this._prefix}/count`, this.count);
        this.router.get(`${this._prefix}/page`, this.page);
    }

    public getRouter = (): Router => {
        return this.router;
    }

    protected getRepository = () : HDRepository => {
        return this._repository;
    }

    public getNaturalId = () : string => {
        return naturalId;
    }
}