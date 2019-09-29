import mongoose from "mongoose";
import {IHd, HD_MODEL} from "../model/HD";
import {BaseRepository} from "./BaseRepository";
import {logger} from "../util/winston";

export class HdRepository extends BaseRepository<IHd> {

    constructor() {
        super(HD_MODEL);
    }

    public getByHdNumber = async (hdNumber : number) : Promise<IHd | null> => {

        logger.debug("Entered getByHdNumber");

        const result : IHd | null = await this._model.findOne({HD: hdNumber});

        return result;
    }
}