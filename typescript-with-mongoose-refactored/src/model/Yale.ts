import mongoose from "mongoose";
import { ICoordinateSet, IXrefSet, ICOORDINATES_SET_SCHEMA, IXREFSET_SCHEMA } from "./Common";

export const naturalId : string = "HR";

export interface IYale extends mongoose.Document {

    VizierID        : number;
    HR              : number;
    Name            : string;
    DM              : string;
    FK5             : number;
    Multiple        : string;
    ADScomponents   : string;
    VisualMagnitude : number;
    BV              : number;
    UB              : number;
    SpectralType    : string;
    Parallax        : number;
    RadialVelocity  : number;
    RotationalVelocity    : number;
    MultipleCount   : number;
    NoteFlag        : string;
    coordinates     : ICoordinateSet;
    xref            : IXrefSet;
}

const schema : mongoose.Schema = new mongoose.Schema({

    VizierID        : { type: Number },
    HR              : { type : Number, indexed: true, required : true},
    Name            : { type : String },
    DM              : { type : String },
    FK5             : { type : Number },
    VisualMagnitude : { type : Number },
    BV              : { type : Number },
    UB              : { type : Number },
    SpectralType    : { type : String},
    Parallax        : { type : Number },
    RadialVelocity  : { type : Number },
    RotationalVelocity     : { type : Number },
    MultipleCount   : { type : Number },
    NoteFlag        : { type : String },
    coordinates     : ICOORDINATES_SET_SCHEMA,
    xref            : IXREFSET_SCHEMA
});

export const YALE_MODEL : mongoose.Model<IYale> = mongoose.model<IYale>("yale", schema, "yale");