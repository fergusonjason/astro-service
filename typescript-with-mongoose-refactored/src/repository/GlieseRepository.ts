import { BaseRepository } from "./BaseRepository";
import { IGliese, GLIESE_MODEL } from "../model/Gliese";

export class GlieseRepository extends BaseRepository<IGliese> {

    constructor() {
        super(GLIESE_MODEL);
    }
}