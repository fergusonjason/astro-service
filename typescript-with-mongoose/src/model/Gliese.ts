import mongoose from "mongoose";

/**
 * Gliese Catalog (1991 update)
 *
 * name - name (not necessarily unique)(natural id)
 * rab1950 - Right Ascension (B1950)
 * deb1950 - Declination (B1950)
 * pm - proper motion
 * pmPa - direction of proper motion
 * rv - radial velocity
 * sp - spectral type
 * vMag - apparent (visual) magnitude
 * bvMag - color
 * plx - resulting parallax
 * raIcrs - Right Ascension (ICRS)
 * deIcrs - Declination (ICRS)
 */
export interface IGliese extends mongoose.Document {

    name: string;
    rab1950: number;
    deb1950: number;
    pm : number;
    pmPa: number;
    rv : number | null;
    sp: string | null;
    vMag: string;
    bvMag : string | null;
    plx: number;
    raIcrs : string;
    deIcrs : string;

}

const schema : mongoose.Schema = new mongoose.Schema({
    name : {type : String, indexed: true, required: true},
    rab1950 : { type : Number },
    deb1950 : {type : Number },
    pm : {type : Number },
    pmPa : { type : Number },
    rv : { type : Number },
    sp : { type : String },
    vMag : { type : String },
    bvMag : { type : String },
    plx : { type : Number },
    raIcrs : { type : String },
    deIcrs : { type : String }
});

export const GLIESE_MODEL : mongoose.Model<IGliese> = mongoose.model<IGliese>("gliese", schema, "gliese");