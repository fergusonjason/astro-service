import mongoose from "mongoose";

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

    name: string;
    type: string | null;
    rab2000 : string;
    deb2000: string;
    source : string;
    constellation: string;
    lsize : string | null;
    size: number | null;
    magnitude: number | null;
    nMag: string | null;
    desc: string;
}

const schema : mongoose.Schema = new mongoose.Schema({
    name : {type: String, indexed: true, required: true},
    type : {type: String},
    rab2000 : {type : String},
    deb2000 : {type : String},
    constellation : {type : String},
    lsize : {type : String },
    size : {type : Number },
    magnitude : {type : Number },
    nMag : { type : String},
    desc : { type : String }
});

export const NGC2000_MODEL : mongoose.Model<INgc2000> = mongoose.model<INgc2000>("ngc2000", schema, "ngc2000");