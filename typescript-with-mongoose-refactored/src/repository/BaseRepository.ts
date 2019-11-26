import mongoose from "mongoose";
import { IMongoQuery, IFilter } from "../model/MongoQuery";
import { logger } from "../util/Logger";

export abstract class BaseRepository<T extends mongoose.Document> {

    constructor(private _model : mongoose.Model<T>) {
    }

    public getRepository = () => {
        return this._model;
    }

    public count = async (filter: IFilter) : Promise<number> => {

        const result : number = await this._model.collection.countDocuments(filter);

        return result;
    }

    public getPage = async (query : IMongoQuery) : Promise<T[]> => {

        logger.debug(`Entered getPage(), query: ${JSON.stringify(query)}`);

        let mongoQuery;
        // use find, but exclude the _id, coordinates, and xref from page results, we can
        // get them in detail later
        if (query.filter) {
            mongoQuery = this._model.find(query.filter as object, {_id: 0, coordinates: 0});
        } else {
            mongoQuery = this._model.find({}, {_id: 0, coordinates: 0});
        }

        if (query.sort) {
            mongoQuery = mongoQuery.sort(query.sort as object);
        }

        if (query.offset) {
            mongoQuery = mongoQuery.skip(query.offset);
        }

        if (query.limit) {
            mongoQuery = mongoQuery.limit(query.limit);
        }

        return await mongoQuery.exec();
    }
}