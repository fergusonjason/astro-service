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

        const items : T[] = await this.getRepository().getPage(query);
        let offset : number;
        if (query.offset) {
            offset = query.offset;
        } else {
            // by default start with the first record
            offset = 0;
        }

        let limit : number;
        if (query.limit) {
            limit = query.limit;
        } else {
            // set a default limit so I don't get hundreds of thousands of results
            limit = 20;
        }

        const result : IPagedDataResponse<T[]> = {
            result : items,
            start: offset,
            stop: offset + limit,
            totalRecords: items.length
        };

        res.json(result);
    }

}