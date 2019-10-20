import mongoose from "mongoose";
import {CommandCursor } from "mongodb";
import { logger } from "../util/winston";
import { IMongoQuery } from "../model/MongoQuery";

export abstract class BaseRepository<T extends mongoose.Document> {

    protected _model : mongoose.Model<T>;
    private _className : string;

    constructor(model : mongoose.Model<T>, className : string) {
        this._model = model;
        this._className = className;
    }

    public collectionExists = async () : Promise<boolean> => {

        const collectionName : string = this._model.collection.collectionName;

        const collections : CommandCursor = await mongoose.connection.db.listCollections({name: collectionName});
        if (collections) {
            return true;
        } else {
            return false;
        }
    }

    public count = async () : Promise<number> => {

        const result : number = await this._model.collection.countDocuments();

        return result;
    }

    public find = async (obj : object) : Promise<T[]> => {

        const result : T[] = await this._model.find(obj);

        return result;
    }

    public getPage = async (query : IMongoQuery ) : Promise<T[]> => {

        logger.debug(`Entered getPage2(), query: ${JSON.stringify(query)}`);

        let mongoQuery;
        if (query.filter) {
            mongoQuery = this._model.find(query.filter);
        } else {
            mongoQuery = this._model.find({});
        }

        if (query.sort) {
            mongoQuery = mongoQuery.sort(query.sort);
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