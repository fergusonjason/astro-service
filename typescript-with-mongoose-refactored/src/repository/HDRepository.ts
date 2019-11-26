import { BaseRepository } from "./BaseRepository";
import { IHD, HD_MODEL } from "../model/HD";
import { logger } from "../util/Logger";

export class HDRepository extends BaseRepository<IHD> {

    constructor() {
        super(HD_MODEL);
    }
}