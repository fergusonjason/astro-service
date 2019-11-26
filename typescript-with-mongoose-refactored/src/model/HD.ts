import mongoose from "mongoose";
import { ICoordinateSet, IXrefSet, ICOORDINATES_SET_SCHEMA, IXREFSET_SCHEMA } from "./Common";

export const naturalId : string = "HD";

export interface IHD extends mongoose.Document {
    VizierID      : number;
    HD            : number;
    DM            : string;
    PhotovisualMagnitude           : number;
    PhotographicMagnitude          : number;
    SpectralType  : string;
    Intensity     : string;
    Rem           : string;
    coordinates   : ICoordinateSet;
    xref          : IXrefSet;
}

const schema : mongoose.Schema = new mongoose.Schema({
    VizierID      :  {type : Number, required : true},
    HD            :  {type : Number, required : true, unique: true, index: true},
    DM            :  {type : String, required : true},
    PhotovisualMagnitude            :  {type : Number, required : true},
    PhotographicMagnitude           :  {type : Number, required : true},
    SpectralType  :  {type : String, required : true},
    Intensity     :  {type : Number, required : true},
    Rem           :  {type : String, required : false},
    coordinates   : ICOORDINATES_SET_SCHEMA,
    xref          : IXREFSET_SCHEMA
});

export const HD_MODEL : mongoose.Model<IHD> = mongoose.model<IHD>("hd", schema, "hd");
