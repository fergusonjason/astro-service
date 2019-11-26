import express, { Router } from "express";

import { BaseController } from "./BaseController";
import { INgc2000, naturalId } from "../model/Ngc2000";
import { IController } from "./Controller";
import { Ngc2000Repository } from "../repository/Ngc2000Repository";

export class Ngc2000Controller extends BaseController<INgc2000> implements IController {

    private router: Router;

    private _repository: Ngc2000Repository;

    private _prefix : string = `${this._apiVersion}/ngc2000`;

    constructor() {
        super();

        this.router = express.Router();
        this._repository = new Ngc2000Repository();

        // TODO: Add express validator to ensure the page and pageSize exist and are numbers
        this.router.get(`${this._prefix}/count`, this.count);
        this.router.get(`${this._prefix}/page`, this.page);
    }

    public getRouter = (): Router => {
        return this.router;
    }

    protected getRepository = () : Ngc2000Repository => {
        return this._repository;
    }

    public getNaturalId = () : string => {
        return naturalId;
    }
}