import mongoose from "mongoose";
import { ICoordinateSet, IXrefSet, ICOORDINATES_SET_SCHEMA, IXREFSET_SCHEMA } from "./Common";

export const naturalId : string = "Name";

export interface IGliese extends mongoose.Document {
    VizierID         : number;
    Name             : string;
    Comp             : string | null;
    ProperMotion     : number | null;
    ProperMotionAngle: number | null;
    RadialVelocity   : number | null;
    SpectralType     : string | null;
    VisualMagnitude  : number;
    BV               : number | null;
    UB               : number | null;
    Parallax         : number | null;
    AbsoluteMagnitude: number | null;
    DM               : string | null;
    coordinates      : ICoordinateSet;
}

const schema : mongoose.Schema = new mongoose.Schema({
    VizierID          : {type: Number, required: true, indexed: true},
    Name              : {type: String, required: true, indexed: true},
    Comp              : {type: String },
    ProperMotion      : {type: Number },
    ProperMotionAngle : {type: Number },
    SpectralType      : {type: String },
    VisualMagnitude   : {type: Number },
    BV                : {type: Number },
    UB                : { type: Number },
    Parallax          : { type: Number },
    AbsoluteMagnitude : { type: Number },
    DM                : {type: String},
    coordinates       : ICOORDINATES_SET_SCHEMA,
});

export const GLIESE_MODEL : mongoose.Model<IGliese> = mongoose.model<IGliese>("gliese", schema, "gliese");