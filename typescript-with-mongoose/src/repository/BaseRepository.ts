import mongoose from "mongoose";
import {CommandCursor} from "mongodb";

export abstract class BaseRepository<T extends mongoose.Document> {

    protected _model : mongoose.Model<T>;

    constructor(model : mongoose.Model<T>) {
        this._model = model;
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

    public abstract getById(id : number | string) : Promise<T | null>;

    public abstract getPage(start : number, stop : number) : Promise<T[]>;
}