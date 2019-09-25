import {logger} from "../util/winston";
import { PagedDataRequest } from "../model/PagedDataRequest";
import * as config from "../../config/dev.json";
import mongoose from "mongoose";

export abstract class BaseRepository<T> {

    protected uri : string;

    constructor() {
        this.uri = config.mongodb.uri;

        mongoose.connect(this.uri, {useNewUrlParser: true});

    }

    public exists(collectionName : string) : boolean {

        return true;

    }

    public abstract get(id : number | string) : Promise<T>;

    public abstract count() : Promise<number>;

    public abstract getAll() : T[];

    public abstract getPage(pageRequest : PagedDataRequest) : T[];

    // private mongoConnect = async (uri : string) : Promise<mongoose.Connection>  => {

    //     let result : Promise<mongoose.Connection>;

    //     try {
    //         await mongoose.createConnection(this.uri);
    //         //result = await mongoose.createConnection(this.uri);
    //     } catch (err) {
    //         logger.error("Unable to retireve mongoose connection");
    //     }
    // }

}