import mongoose from "mongoose";
import { ICoordinateSet, IXrefSet, ICOORDINATES_SET_SCHEMA, IXREFSET_SCHEMA } from "./common";

/**
 * NGC 2000 catalog
 *
 * name - name
 * type - object classification
 * rab2000
 * deb2000
 * source - source of entry
 * constellation
 * lSize - limit on size
 * size - largest dimension
 * magnitude
 * nMag
 * desc - description of object
 */
export interface INgc2000 extends mongoose.Document {

    name          : string;
    type          : string | null;
    source        : string;
    constellation : string;
    size          : number | null;
    magnitude     : number | null;
    desc          : string;
    coordinates   : ICoordinateSet;
    xref          : IXrefSet;
}

const schema : mongoose.Schema = new mongoose.Schema({
    name          : { type : String, indexed: true, required: true },
    type          : { type : String },
    source        : { type : String },
    constellation : { type : String },
    size          : { type : Number },
    magnitude     : { type : Number },
    desc          : { type : String },
    coordinates   : ICOORDINATES_SET_SCHEMA,
    xref          : IXREFSET_SCHEMA
});

export const NGC2000_MODEL : mongoose.Model<INgc2000> = mongoose.model<INgc2000>("ngc2000", schema, "ngc2000");