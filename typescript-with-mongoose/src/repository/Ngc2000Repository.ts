import { INgc2000, NGC2000_MODEL } from "../model/Ngc2000";
import { BaseRepository } from "./BaseRepository";
import { logger } from "../util/winston";

export class Ngc2000Repository extends BaseRepository<INgc2000> {

    constructor() {
        super(NGC2000_MODEL, "NgcRepository");
    }

}