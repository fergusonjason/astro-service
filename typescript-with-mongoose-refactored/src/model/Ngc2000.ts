import mongoose from "mongoose";
import { ICoordinateSet, IXrefSet, ICOORDINATES_SET_SCHEMA, IXREFSET_SCHEMA } from "./Common";

export const naturalId : string = "Name";

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

    VizierID      : string;
    Name          : string;
    Type          : string | null;
    Source        : string;
    Const         : string;
    Size          : number | null;
    Magnitude     : number | null;
    Desc          : string;
    coordinates   : ICoordinateSet;
    xref          : IXrefSet;
}

const schema : mongoose.Schema = new mongoose.Schema({

    VizierID      : { type: Number },
    Name          : { type : String, indexed: true, required: true },
    Type          : { type : String },
    Source        : { type : String },
    Const         : { type : String },
    Size          : { type : Number },
    Magnitude     : { type : Number },
    Desc          : { type : String },
    coordinates   : ICOORDINATES_SET_SCHEMA,
    xref          : IXREFSET_SCHEMA
});

export const NGC2000_MODEL : mongoose.Model<INgc2000> = mongoose.model<INgc2000>("ngc2000", schema, "ngc2000");