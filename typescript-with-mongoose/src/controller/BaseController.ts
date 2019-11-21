import { Request, Response } from "express";
import { getQueryString, parseUrl } from "../util/QueryProcessor";
import { IMongoQuery } from "../model/MongoQuery";
import { BaseRepository } from "../repository/BaseRepository";
import { IPagedDataResponse } from "./PagedDataResponse";
import { Document } from "mongoose";
import querystring, { ParsedUrlQuery } from "querystring";
import { logger } from "../util/winston";

export abstract class BaseController<T extends Document>  {

    protected _apiVersion : string = "/v1";

    public abstract initializeRoutes() : void;

    public abstract getRepository() : BaseRepository<T>;

    public abstract getNaturalIdField() : string;

    public count = async (req : Request, res : Response) : Promise<void> => {

        const count : number = await this.getRepository().count();
        const result : object = {count : count};
        res.send(result);
    }

    public get = async (req : Request, res : Response) : Promise<void> => {

        const id : number = req.query.id;
        if (!id) {
            res.status(400).send("No id provided");
            return;
        }

        const convertedId : number = +id;

        try {
            const query : IMongoQuery = {};
            let result : T[];
            if (isNaN(convertedId)) {
                query.filter = {[this.getNaturalIdField()] : id};
            } else {
                query.filter = {[this.getNaturalIdField()] : convertedId};
            }

            result = await this.getRepository().getPage(query);

            res.json(result);
        } catch (err) {
            res.status(500).send(`Error occurred: ${err}`);
        }
    }

    public abstract getAll(req : Request, res : Response) : void;

    public page = async (req : Request, res : Response) : Promise<void> => {

        // process the URL into a ParsedUrlQuery
        const mongoQuery: IMongoQuery = parseUrl(req.url);

        logger.debug(`Mongo Query: ${JSON.stringify(mongoQuery)}`);

        const items : T[] = await this.getRepository().getPage(mongoQuery);

        const start: number = (mongoQuery.offset) ? mongoQuery.offset : 0;
        const stop: number = start + ((mongoQuery.limit) ? mongoQuery.limit : 20);

        const filter : any = mongoQuery.filter ? mongoQuery.filter : {};
        const recordCount: number = await this.getRepository().getCount(filter);

        const result : IPagedDataResponse<T[]> = {
            result : items,
            start: start,
            stop: stop,
            totalRecords: recordCount
        };

        res.json(result);
    }

}