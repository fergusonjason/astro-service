import mongoose from "mongoose";
import { ICoordinateSet, IXrefSet, ICOORDINATES_SET_SCHEMA, IXREFSET_SCHEMA } from "./common";

/**
 * Yale Bright Star catalog
 *
 * HR - Harvard Revised Number/Bright Star Number (natural id)
 * Name -  name
 * HD - HD catalog number
 * ADS - Aitken's Double Star Catalog id
 * varId - Variable star ID
 * vMag - Visual magnitude
 * bvMag - b-v color
 * spType - Spectral type
 */
export interface IYale extends mongoose.Document {

    HR              : number;
    name            : string;
    BV              : number;
    VisualMagnitude : number;
    SpectralType    : string;
    coordinates     : ICoordinateSet;
    xref            : IXrefSet;
}

const schema : mongoose.Schema = new mongoose.Schema({

    HR              : { type : Number, indexed: true, required : true},
    name            : { type : String },
    VisualMagnitude : { type : Number },
    BV              : { type : Number },
    SpectralType    : { type : String},
    coordinates     : ICOORDINATES_SET_SCHEMA,
    xref            : IXREFSET_SCHEMA
});

export const YALE_MODEL : mongoose.Model<IYale> = mongoose.model<IYale>("yale", schema, "yale");