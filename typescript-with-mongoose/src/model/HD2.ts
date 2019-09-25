import mongoose, { Schema } from "mongoose";

export interface IHd extends mongoose.Document {

    RAJ2000 : string;
    DEJ2000 : string;
    HD : number;
    DM : string;
    RAB1900 : string;
    DEB1900 : string;
    qPtm : string;
    Ptm : string;
    nPtm : string;
    qPtg : string;
    Ptg : string;
    nPtg : string;
    SpT : string;
    intensity : string;
    Rem : string;
    RAicrs : string;
    DEicrs : string;
}

const schema : mongoose.Schema = new Schema({
    RAJ2000    :  {type : String, required : true},
    DEJ2000    :  {type : String, required : true},
    HD         :  {type : Number, required : true, unique: true, index: true},
    DM         :  {type : String, required : true},
    RAB1900    :  {type : String, required : true},
    DEB1900    :  {type : String, required : true},
    qPtm       :  {type : String, required : true},
    Ptm        :  {type : String, required : true},
    nPtm       :  {type : String, required : true},
    qPtg       :  {type : String, required : true},
    Ptg        :  {type : String, required : true},
    nPtg       :  {type : String, required : true},
    SpT        :  {type : String, required : true},
    intensity  :  {type : String, required : true},
    Rem        :  {type : String, required : false},
    RAicrs     :  {type : String, required : true},
    DEicrs     :  {type : String, required : true},
});

export const hdModel : mongoose.Model<IHd> = mongoose.model<IHd>("hd", schema);
