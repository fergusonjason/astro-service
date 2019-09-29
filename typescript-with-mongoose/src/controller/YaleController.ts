import { IYale } from "../model/Yale";
import { BaseController } from "./BaseController";
import { IInitializesRoutes } from "./InitializesRoutes";
import { YaleRepository } from "../repository/YaleRepository";
import { IPagedDataResponse } from "../model/PagedDataResponse";

import express, { Request, Response, Router } from "express";

export class YaleController extends BaseController<IYale> implements IInitializesRoutes {

    public router : Router;

    private prefix : string = "/hd";
    private repository : YaleRepository;

    constructor() {
        super();
        this.router = express.Router();
        this.repository = new YaleRepository();
    }

    public initializeRoutes(): void {

        this.router.get(`${this.prefix}/count`, this.count);
        this.router.get(`${this.prefix}/get`, this.get);
        this.router.get(`${this.prefix}/getAll`, this.getAll);
        this.router.get(`${this.prefix}/page`, this.page);
    }

    public count = async (req : Request, res : Response): Promise<void> => {

        const count : number = await this.repository.count();
        res.send(count);
    }

    public get = async (req : Request, res : Response): Promise<void> => {

        const id : number = req.query.id;
        const result : IYale | null = await this.repository.getById(id);

        res.json(result);
    }

    public getAll(req : Request, res : Response): void {
        throw new Error("Not a good idea");
    }

    public page = async (req : Request, res : Response): Promise<void> => {

        const start : number = Number(req.query.start);
        const end : number = Number(req.query.end);

        const count : number = await this.repository.count();
        const items : IYale[] = await this.repository.getPage(start, end);

        const result : IPagedDataResponse<IYale[]> = {
            result : items,
            start : start,
            stop : end,
            totalRecords : count
        };

        res.json(result);
    }

}