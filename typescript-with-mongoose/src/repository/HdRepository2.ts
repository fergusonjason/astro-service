import mongoose from "mongoose";
import {CommandCursor} from "mongodb";
import {IHd, hdModel} from "../model/HD2";
import {BaseRepository} from "./BaseRepository2";
import {logger} from "../util/winston";

export class HdRepository extends BaseRepository<IHd>{

    constructor() {
        super(hdModel);
    }

    public collectionExists = async () : Promise<boolean> => {

        const collections : CommandCursor = await mongoose.connection.db.listCollections({name: "hds"});
        if (collections) {
            return true;
        } else {
            return false;
        }
    }

    public getByHdNumber = async (hdNumber : number) : Promise<IHd | null> => {

        logger.debug("Entered getByHdNumber");

        const result : IHd | null = await this._model.findOne({HD: hdNumber});

        return result;
    }
}