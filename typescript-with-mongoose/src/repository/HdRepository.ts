import mongoose from "mongoose";
import {IHd, HD_MODEL} from "../model/HD";
import {BaseRepository} from "./BaseRepository";
import {logger} from "../util/winston";

export class HdRepository extends BaseRepository<IHd> {

    constructor() {
        super(HD_MODEL);
    }

    public getById = async (id : number): Promise<IHd | null> => {

        const result : IHd | null = await this._model.findOne({HD: id});

        return result;
    }

    public getAll = async () : Promise<IHd[] | null> => {

        logger.debug("getAll() is not implemented. Use getPage()");

        return null;
    }

    public getPage = async (start : number, stop : number) : Promise<IHd[]> => {

        const result : IHd[] = await this._model.find({HD : {$gte : start, $lte : stop}}).exec();

        return result;
    }
}