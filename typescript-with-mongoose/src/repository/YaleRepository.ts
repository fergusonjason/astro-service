import { IYale, YALE_MODEL } from "../model/Yale";
import { BaseRepository } from "./BaseRepository";
import { logger } from "../util/winston";

export class YaleRepository extends BaseRepository<IYale> {

    constructor() {
        super(YALE_MODEL, "YaleRepository");
    }

}
