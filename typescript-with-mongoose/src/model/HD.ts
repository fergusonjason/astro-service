import mongoose from "mongoose";
import { ICoordinateSet, IXrefSet, ICOORDINATES_SET_SCHEMA, IXREFSET_SCHEMA } from "./common";

export interface IHd extends mongoose.Document {
    HD            : number;
    DM            : string;
    Ptm           : number;
    qPtg          : number;
    Ptg           : number;
    SpectralType  : string;
    intensity     : string;
    Rem           : string;
    coordinates   : ICoordinateSet;
    xref          : IXrefSet;
}

const schema : mongoose.Schema = new mongoose.Schema({
    HD            :  {type : Number, required : true, unique: true, index: true},
    DM            :  {type : String, required : true},
    Ptm           :  {type : Number, required : true},
    qPtg          :  {type : Number, required : true},
    Ptg           :  {type : Number, required : true},
    SpectralType  :  {type : String, required : true},
    intensity     :  {type : Number, required : true},
    Rem           :  {type : String, required : false},
    coordinates   : ICOORDINATES_SET_SCHEMA,
    xref          : IXREFSET_SCHEMA
});

export const HD_MODEL : mongoose.Model<IHd> = mongoose.model<IHd>("hd", schema, "hd");
