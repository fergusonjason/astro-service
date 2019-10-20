import { IGliese, GLIESE_MODEL } from "../model/Gliese";
import { BaseRepository } from "./BaseRepository";
import { logger } from "../util/winston";

export class GlieseRepository extends BaseRepository<IGliese> {

    constructor() {
        super(GLIESE_MODEL, "GlieseRepository");
    }

    public getByName(id : string): Promise<IGliese[] | null> {

        const result : Promise<IGliese[] | null> = GLIESE_MODEL.find({Name: id}).exec();
        return result;
    }

}