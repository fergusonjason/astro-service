import mongoose from "mongoose";

export abstract class BaseRepository<T extends mongoose.Document> {

    protected _model : mongoose.Model<T>;

    constructor(model : mongoose.Model<T>) {
        this._model = model;
    }

    public abstract collectionExists() : Promise<boolean>;

    public create = async (obj : T) : Promise<T> => {

        const result : T = await this._model.create(obj);

        return result;
    }

    public count = async () : Promise<number> => {

        const result : number = await this._model.collection.countDocuments();

        return result;
    }

    public find = async (obj : object) : Promise<T[]> => {

        const result : T[] = await this._model.find(obj);

        return result;
    }
}