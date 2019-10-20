import { Request, Response } from "express";
import { getQueryString, parseUrl } from "../util/QueryProcessor";
import { IMongoQuery } from "../model/MongoQuery";
import { BaseRepository } from "../repository/BaseRepository";
import { IPagedDataResponse } from "./PagedDataResponse";
import mongoose from "mongoose";

export abstract class BaseController<T extends mongoose.Document>  {

    protected _apiVersion : string = "/v1";

    public abstract initializeRoutes() : void;

    public abstract count(req : Request, res : Response) : void;

    public abstract get(req : Request, res : Response) : void;

    public abstract getAll(req : Request, res : Response) : void;

    public abstract getRepository() : BaseRepository<T>;

    public page = async (req : Request, res : Response) : Promise<void> => {

        const queryString : string = getQueryString(req.url);
        const query : IMongoQuery = parseUrl(queryString);

        if (!query.offset) {
            query.offset = 0;
        }

        if (!query.limit) {
            query.limit = 20;
        }

        const items : T[] = await this.getRepository().getPage(query);

        const result : IPagedDataResponse<T[]> = {
            result : items,
            start: query.offset,
            stop: query.offset + query.limit,
            totalRecords: items.length
        };

        res.json(result);
    }

}