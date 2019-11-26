import express, {Request, Response} from "express";
import { Document } from "mongoose";
import { logger } from "../util/Logger";

import { IMongoQuery, ISort, IFilter } from "../model/MongoQuery";
import { convertSortParamToISort, convertFilterParamToIFilter } from "../util/AstroServiceUtils";
import { BaseRepository } from "../repository/BaseRepository";
import { IPagedDataResponse } from "../model/PagedDataResponse";

export abstract class BaseController<T extends Document> {

    protected abstract getRepository() : BaseRepository<T>;

    protected abstract getNaturalId() : string;

    protected _apiVersion : string = "/v1";


    /**
     * Under most circumstances, this will be the single point of entry to the REST
     * service
     *
     * @param req   HTTP request
     * @param res   HTTP response
     */
    public page = async (req: Request, res: Response) : Promise<void> => {

        logger.debug("Entered page()");

        let query: IMongoQuery = {};

        let page: number = 0;
        if (req.query.page) {
            page = parseInt(req.query.page, 10);
        }

        let pageSize: number = 25;
        if (req.query.pageSize) {
            pageSize = parseInt(req.query.pageSize, 10);
        }

        let offset = page * pageSize;
        let limit = pageSize;

        query.offset = offset;
        query.limit = limit;

        let sort: ISort;
        if (req.query.sort) {
            sort = convertSortParamToISort(req.query.sort);
            query.sort = sort;
        } else {
            const naturalId : string = this.getNaturalId();
            sort = { [naturalId] : 1};
            query.sort = sort;
        }

        let filter: IFilter;
        if (req.query.filter) {
            filter = convertFilterParamToIFilter(req.query.filter);
        } else {

            filter = {};
        }
        query.filter = filter;

        const result = await this.getRepository().getPage(query);
        const recordCount = await this.getRepository().count(filter);

        let response: IPagedDataResponse<T> = {
            result: result,
            offset: offset,
            limit: limit,
            recordCount: recordCount
        };

        res.json(response);
    }

    public count = async (req: Request, res: Response) : Promise<void> => {

        let filter: IFilter;
        if (req.query.filter) {
            filter = convertFilterParamToIFilter(req.query.filter);
        } else {
            filter = {};
        }

        const result = await this.getRepository().count(filter);

        res.json(result);
    }
}