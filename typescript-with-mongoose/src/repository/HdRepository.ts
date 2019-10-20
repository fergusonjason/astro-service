import mongoose from "mongoose";
import {IHd, HD_MODEL} from "../model/HD";
import {BaseRepository} from "./BaseRepository";
import { IQueryObj } from "./QueryObj";
import {logger} from "../util/winston";

export class HdRepository extends BaseRepository<IHd> {

    constructor() {
        super(HD_MODEL, "HdRepository");
    }

    public getByNaturalId = async (id : number): Promise<IHd | null> => {

        const result : IHd | null = await this._model.findOne({HD: id});

        return result;
    }

    public getAll = async () : Promise<IHd[] | null> => {

        logger.debug("getAll() is not implemented. Use getPage()");

        return null;
    }

}