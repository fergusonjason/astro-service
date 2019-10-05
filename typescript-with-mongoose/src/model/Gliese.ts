import mongoose from "mongoose";
import { ICoordinateSet, IXrefSet, ICOORDINATES_SET_SCHEMA, IXREFSET_SCHEMA } from "./common";

/**
 * Gliese Catalog (1991 update)
 *
 * Name - name (not necessarily unique)(natural id)
 * pm - proper motion
 * pmPa - direction of proper motion
 * rv - radial velocity
 * sp - spectral type
 * vMag - apparent (visual) magnitude
 * bvMag - color
 * plx - resulting parallax
 */
export interface IGliese extends mongoose.Document {

    Name          : string;
    pm            : number;
    pmPa          : number;
    rv            : number | null;
    sp            : string | null;
    vMag          : string;
    bvMag         : string | null;
    plx           : number;
    coordinates   : ICoordinateSet;
    xref          : IXrefSet;

}

const schema : mongoose.Schema = new mongoose.Schema({
    name          : { type : String, indexed: true, required: true},
    pm            : { type : Number },
    pmPa          : { type : Number },
    rv            : { type : Number },
    sp            : { type : String },
    vMag          : { type : String },
    bvMag         : { type : String },
    plx           : { type : Number },
    coordinates   : ICOORDINATES_SET_SCHEMA,
    xref          : IXREFSET_SCHEMA
});

export const GLIESE_MODEL : mongoose.Model<IGliese> = mongoose.model<IGliese>("gliese", schema, "gliese");