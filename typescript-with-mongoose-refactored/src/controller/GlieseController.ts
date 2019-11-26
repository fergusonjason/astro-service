import express, { Router } from "express";

import { BaseController } from "./BaseController";
import { IGliese, naturalId } from "../model/Gliese";
import { IController } from "./Controller";
import { GlieseRepository } from "../repository/GlieseRepository";

export class GlieseController extends BaseController<IGliese> implements IController {

    private router: Router;

    private _repository: GlieseRepository;

    private _prefix : string = `${this._apiVersion}/gliese`;

    constructor() {
        super();

        this.router = express.Router();
        this._repository = new GlieseRepository();

        // TODO: Add express validator to ensure the page and pageSize exist and are numbers
        this.router.get(`${this._prefix}/count`, this.count);
        this.router.get(`${this._prefix}/page`, this.page);
    }

    public getRouter = (): Router => {
        return this.router;
    }

    protected getRepository = () : GlieseRepository => {
        return this._repository;
    }

    public getNaturalId = () : string => {
        return naturalId;
    }
}