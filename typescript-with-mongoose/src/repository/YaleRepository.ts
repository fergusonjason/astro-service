import { IYale, YALE_MODEL } from "../model/Yale";
import { BaseRepository } from "./BaseRepository";
import { logger } from "../util/winston";

export class YaleRepository extends BaseRepository<IYale> {

    constructor() {
        super(YALE_MODEL);
    }

    public getById = async (id : string | number): Promise<IYale | null> => {

        logger.debug(`YaleRepository: entered getById(), id: ${id}`);
        return await this._model.findOne({HR : id});
    }

    public getPage = async (start : number, stop : number): Promise<IYale[]> => {

        logger.debug(`YaleRepository: entered getPage(), start: ${start}, stop: ${stop}`);
        return await this._model.find({HR : { $gte : start, $lte: stop}}).exec();
    }
}
