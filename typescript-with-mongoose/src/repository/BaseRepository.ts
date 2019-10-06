import mongoose from "mongoose";
import {CommandCursor} from "mongodb";
import { logger } from "../util/winston";
import { IQueryObj } from "./QueryObj";

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

    public abstract getByNaturalId(id : number | string) : Promise<T | null>;

    public getPage = async (start : number, pageSize : number, field? : string, sortDir? : number,
                            filterOp? : string, filterVal? : string | number) : Promise<T[]> => {

        logger.debug(`${this._className} (base): entered getPage(): start: ${start}, pageSize: ${pageSize},
        field: ${field}, sortDir: ${sortDir}, filterOp: ${filterOp}, filterVal: ${filterVal}`);

        if (!field) {
            logger.debug("No field specified, using _id (you probably don't want this)");
            field = "_id";
        }

        if (!sortDir) {
            sortDir = 1;
        }

        const findObj : IQueryObj = {};
        const sortObj : IQueryObj = {};
        const mongoOp : string = "$" + filterOp;
        if (filterOp && filterVal) {

            sortObj[field] = sortDir;

            switch (filterOp) {
                case "startsWith" :
                    const regexp : RegExp = new RegExp("^" + filterVal);
                    findObj[field] = { $regex : regexp};
                    break;
                default:
                    findObj[field] = { [mongoOp] : filterVal };
            }
        } else {
            sortObj[field] = sortDir;
        }

        logger.debug(`Findobj: ${JSON.stringify(findObj)}, sortobj: ${JSON.stringify(sortObj)}`);

        return await this._model.find(findObj).sort(sortObj).skip(start)
            .limit(pageSize).exec();
    }
}