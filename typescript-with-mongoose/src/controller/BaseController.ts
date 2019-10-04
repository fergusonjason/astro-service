import { Request, Response } from "express";

export abstract class BaseController<T>  {

    protected _apiVersion : string = "/v1";

    public abstract initializeRoutes() : void;

    public abstract count(req : Request, res : Response) : void;

    public abstract get(req : Request, res : Response) : void;

    public abstract getAll(req : Request, res : Response) : void;

    public abstract page(req : Request, res : Response) : void;

}