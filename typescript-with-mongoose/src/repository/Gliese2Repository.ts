import { IGliese2, GLIESE2_MODEL } from "../model/Gliese2";
import { BaseRepository } from "./BaseRepository";

export class Gliese2Repository extends BaseRepository<IGliese2> {

    constructor() {
        super(GLIESE2_MODEL, "Gliese2Repository");
    }

    public getByName(id : string): Promise<IGliese2[] | null> {

        const result : Promise<IGliese2[] | null> = GLIESE2_MODEL.find({Name: id}).exec();
        return result;
    }
}