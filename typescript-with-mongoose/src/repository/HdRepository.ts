import mongoose from "mongoose";
import {CommandCursor} from "mongodb";
import {IHd, HD_MODEL} from "../model/HD";
import {BaseRepository} from "./BaseRepository";
import {logger} from "../util/winston";

export class HdRepository extends BaseRepository<IHd> {

    constructor() {
        super(HD_MODEL);
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