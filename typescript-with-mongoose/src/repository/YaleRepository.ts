import { IYale, YALE_MODEL } from "../model/Yale";
import { BaseRepository } from "./BaseRepository";

export class YaleRepository extends BaseRepository<IYale> {

    constructor() {
        super(YALE_MODEL);
    }

    public getById = async (id : string | number): Promise<IYale | null> => {

        return await this._model.findOne({hr : id});
    }
    public getPage = async (start : number, stop : number): Promise<IYale[]> => {

        return await this._model.find({hr : { $gte : start, $lte: stop}}).exec();
    }
}
