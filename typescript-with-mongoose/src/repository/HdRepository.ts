import mongoose from "mongoose";
import {IHd, HD_MODEL} from "../model/HD";
import {BaseRepository} from "./BaseRepository";
import { IQueryObj } from "./QueryObj";
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

    public getPage = async (start : number, pageSize : number, field? : string, sortDir? : number)
        : Promise<IHd[]> => {

        logger.debug(`YaleRepository: entered getPage(), start: ${start}, pageSize: ${pageSize}, field: ${field}, sortDir: ${sortDir}`);

        if (!field) {
            field = "HD";
        }

        if (!sortDir) {
            sortDir = 1;
        }

        let findObj : IQueryObj = {};
        let sortObj : IQueryObj = {};
        switch (field) {
            case "HD" :
                findObj = {
                    HD : { $gte : start }
                };
                sortObj = {
                    HD : sortDir
                };
                break;
            case "DM" :
                findObj = {
                    DM : { $gte : start }
                };
                sortObj = {
                    DM : sortDir
                };
                break;
            case "Ptg" :
                findObj = {
                    Ptg : { $gte : start }
                };
                sortObj = {
                    Ptg : sortDir
                };
                break;
            case "SpT" :
                findObj = {
                    SpT : { $gte : start }
                };
                sortObj = {
                    SpT : sortDir
                };
                break;
            case "Int" :
                    findObj = {
                        SpT : { $gte : start }
                    };
                    sortObj = {
                        SpT : sortDir
                    };
                    break;
        }
        const result : IHd[] = await this._model.find(findObj).sort(sortObj).skip(start).limit(pageSize).exec();

        return result;
    }
}