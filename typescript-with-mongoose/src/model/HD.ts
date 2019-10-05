import mongoose from "mongoose";
import { ICoordinateSet, IXrefSet, ICOORDINATES_SET_SCHEMA, IXREFSET_SCHEMA } from "./common";

export interface IHd extends mongoose.Document {
    HD        : number;
    DM        : string;
    qPtm      : string;
    Ptm       : string;
    nPtm      : string;
    qPtg      : string;
    Ptg       : string;
    nPtg      : string;
    SpT       : string;
    intensity : string;
    Rem       : string;
    coordinates: ICoordinateSet;
    xref      : IXrefSet;
}

const schema : mongoose.Schema = new mongoose.Schema({
    HD         :  {type : Number, required : true, unique: true, index: true},
    DM         :  {type : String, required : true},
    qPtm       :  {type : String, required : true},
    Ptm        :  {type : String, required : true},
    nPtm       :  {type : String, required : true},
    qPtg       :  {type : String, required : true},
    Ptg        :  {type : String, required : true},
    nPtg       :  {type : String, required : true},
    SpT        :  {type : String, required : true},
    intensity  :  {type : String, required : true},
    Rem        :  {type : String, required : false},
    coordinates : ICOORDINATES_SET_SCHEMA,
    xref : IXREFSET_SCHEMA
});

export const HD_MODEL : mongoose.Model<IHd> = mongoose.model<IHd>("hd", schema, "hd");
