import { BaseRepository } from "./BaseRepository";
import { IYale, YALE_MODEL } from "../model/Yale";

export class YaleRepository extends BaseRepository<IYale> {

    constructor() {
        super(YALE_MODEL);
    }
}