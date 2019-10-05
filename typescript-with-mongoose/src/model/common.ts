import mongoose from "mongoose";

export interface ICoordinatesEntry extends mongoose.Document {
    ra : string;
    de : string;
}

const ICOORDINATES_ENTRY_SCHEMA : mongoose.Schema = new mongoose.Schema({
    ra : {type : String},
    de : {type : String}
});

export interface ICoordinateSet extends mongoose.Document {
    B1900 : ICoordinatesEntry;
    B1950 : ICoordinatesEntry;
    J2000 : ICoordinatesEntry;
    ICRS  : ICoordinatesEntry;
}

export const ICOORDINATES_SET_SCHEMA : mongoose.Schema = new mongoose.Schema({
    B1900 : ICOORDINATES_ENTRY_SCHEMA,
    B1950 : ICOORDINATES_ENTRY_SCHEMA,
    J2000 : ICOORDINATES_ENTRY_SCHEMA,
    ICRS  : ICOORDINATES_ENTRY_SCHEMA
});

export interface IXrefEntry extends mongoose.Document {
    id      : string | number;
    entryId : mongoose.Schema.Types.ObjectId;
}

export const IXREF_ENTRY_SCHEMA : mongoose.Schema = new mongoose.Schema({
    id : mongoose.Schema.Types.Mixed,
    entryId : {type : mongoose.Schema.Types.ObjectId, required: false}
});

export interface IXrefSet extends mongoose.Document {
    HD      : IXrefEntry;
    NGC2000 : IXrefEntry;
    YALE    : IXrefEntry;
    GLIESE  : IXrefEntry;
}

export const IXREFSET_SCHEMA : mongoose.Schema = new mongoose.Schema({
    HD      : IXREF_ENTRY_SCHEMA,
    NGC2000 : IXREF_ENTRY_SCHEMA,
    YALE    : IXREF_ENTRY_SCHEMA,
    GLIESE  : IXREF_ENTRY_SCHEMA
});