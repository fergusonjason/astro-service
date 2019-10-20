import { IYale, YALE_MODEL } from "../model/Yale";
import { BaseRepository } from "./BaseRepository";
import { IQueryObj } from "./QueryObj";
import { logger } from "../util/winston";

export class YaleRepository extends BaseRepository<IYale> {

    constructor() {
        super(YALE_MODEL, "YaleRepository");
    }

    public getByNaturalId = async (id : string | number): Promise<IYale | null> => {

        logger.debug(`YaleRepository: entered getById(), id: ${id}`);

        return await this._model.findOne({HR : id});
    }

}
