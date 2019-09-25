import { PagedDataRequest } from "../model/PagedDataRequest";
import * as mongoose from "mongoose";
import { Request, Response, Router } from "express";
import { InitializesRoutes } from "../model/InitializesRoutes";

export abstract class BaseController<T>  {

    constructor() {}

    public abstract initializeRoutes() : void;

    public abstract count(req : Request, res : Response) : void;

    public abstract get(req : Request, res : Response) : void;

    public abstract getAll(req : Request, res : Response) : void;

    public abstract page(req : Request, res : Response) : void;

}