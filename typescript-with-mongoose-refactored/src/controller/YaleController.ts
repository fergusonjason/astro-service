import express from "express";

import { BaseController } from "./BaseController";
import { IController } from "./Controller";
import { IYale, naturalId } from "../model/Yale";
import { YaleRepository } from "../repository/YaleRepository";
import { Router } from "express";

export class YaleController extends BaseController<IYale> implements IController {

    private router: Router;

    private _repository: YaleRepository;

    private _prefix : string = `${this._apiVersion}/ybs`;

    constructor() {
        super();

        this.router = express.Router();
        this._repository = new YaleRepository();

        // TODO: Add express validator to ensure the page and pageSize exist and are numbers
        this.router.get(`${this._prefix}/count`, this.count);
        this.router.get(`${this._prefix}/page`, this.page);
    }

    public getRouter = (): Router => {
        return this.router;
    }

    protected getRepository = () : YaleRepository => {
        return this._repository;
    }

    public getNaturalId = () : string => {
        return naturalId;
    }
}