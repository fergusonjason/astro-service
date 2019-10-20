import { IGliese, GLIESE_MODEL } from "../model/Gliese";
import { BaseRepository } from "./BaseRepository";
import { logger } from "../util/winston";

export class GlieseRepository extends BaseRepository<IGliese> {

    constructor() {
        super(GLIESE_MODEL, "GlieseRepository");
    }

    public getByNaturalId(id : string | number): Promise<IGliese | null> {
        throw new Error("Method not implemented.");
    }

    public getByName(id : string): Promise<IGliese[] | null> {

        const result : Promise<IGliese[] | null> = GLIESE_MODEL.find({Name: id}).exec();
        return result;
    }

}