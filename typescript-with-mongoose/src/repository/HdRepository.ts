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

    public getById = async (id : number): Promise<IHd | null> => {

        const result : IHd | null = await this._model.findOne({HD: id});

        return result;
    }

    public getPage = async (start : number, stop : number) : Promise<IHd[]> => {

        const result : IHd[] = await this._model.find({HD : {$gte : start, $lte : stop}}).exec();

        return result;
    }
}