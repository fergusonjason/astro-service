import { INgc2000, NGC2000_MODEL } from "../model/Ngc2000";
import { BaseRepository } from "./BaseRepository";

export class Ngc2000Repository extends BaseRepository<INgc2000>{

    constructor() {
        super(NGC2000_MODEL);
    }

    public getById = async (id : string): Promise<INgc2000 | null> => {
        return await this._model.findOne({name : id});
    }

    public getPage = async (start : number, stop : number): Promise<INgc2000[]> => {

        return await this._model.find().exec();

    }
}