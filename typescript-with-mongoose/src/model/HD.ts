import mongoose, { Document, Schema, Model } from "mongoose";

export interface IHD extends Document {
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

export interface HDModel extends Model<IHD> {}

export class HD {

    private _model : Model<IHD>;

    constructor() {

        const schema : Schema = new Schema({
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

        this._model = mongoose.model<IHD>("HD", schema);
    }

    public get model() : Model<IHD> {
        return this._model;
    }
}

export const HdSchema : Schema = new Schema({
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

//export const HdModel : Model<HD & mongoose.Document> = mongoose.model<HD>("HD", HdSchema);