import { IGliese, GLIESE_MODEL } from "../model/Gliese";
import { BaseRepository } from "./BaseRepository";

export class GlieseRepository extends BaseRepository<IGliese> {

    constructor() {
        super(GLIESE_MODEL);
    }

    public getById(id : string | number): Promise<IGliese | null> {

        throw new Error("Method not implemented.");
    }

    public getPage = async (start : number, stop : number): Promise<IGliese[]> => {

        throw new Error("Method not implemented.");
    }
}