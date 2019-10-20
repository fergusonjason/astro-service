import { Request, Response } from "express";
import { getQueryString, parseUrl } from "../util/QueryProcessor";
import { IMongoQuery } from "../model/MongoQuery";
import { BaseRepository } from "../repository/BaseRepository";
import { IPagedDataResponse } from "./PagedDataResponse";
import mongoose from "mongoose";

export abstract class BaseController<T extends mongoose.Document>  {

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

        const queryString : string = getQueryString(req.url);
        const query : IMongoQuery = parseUrl(queryString);

        if (!query.offset) {
            query.offset = 0;
        }

        if (!query.limit) {
            query.limit = 20;
        }

        if (!query.sort) {
            query.sort = {[this.getNaturalIdField()] : 1};
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