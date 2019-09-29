import { INgc2000, NGC2000_MODEL } from "../model/Ngc2000";
import { BaseRepository } from "./BaseRepository";

export class Ngc2000Repository extends BaseRepository<INgc2000>{


    constructor() {
        super(NGC2000_MODEL);
    }

    public collectionExists(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}