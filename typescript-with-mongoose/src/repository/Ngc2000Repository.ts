import { INgc2000, NGC2000_MODEL } from "../model/Ngc2000";
import { BaseRepository } from "./BaseRepository";
import { logger } from "../util/winston";

export class Ngc2000Repository extends BaseRepository<INgc2000> {

    constructor() {
        super(NGC2000_MODEL, "NgcRepository");
    }

    public getByNaturalId = async (id : string): Promise<INgc2000 | null> => {

        logger.debug(`Ngc2000Repository: entered getById(), id: ${id}`);
        return await this._model.findOne({Name : parseInt(id, 10)});
    }

}