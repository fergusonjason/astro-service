"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const schema = new mongoose_1.Schema({
    RAJ2000: { type: String, required: true },
    DEJ2000: { type: String, required: true },
    HD: { type: Number, required: true, unique: true, index: true },
    DM: { type: String, required: true },
    RAB1900: { type: String, required: true },
    DEB1900: { type: String, required: true },
    qPtm: { type: String, required: true },
    Ptm: { type: String, required: true },
    nPtm: { type: String, required: true },
    qPtg: { type: String, required: true },
    Ptg: { type: String, required: true },
    nPtg: { type: String, required: true },
    SpT: { type: String, required: true },
    intensity: { type: String, required: true },
    Rem: { type: String, required: false },
    RAicrs: { type: String, required: true },
    DEicrs: { type: String, required: true },
});
exports.hdModel = mongoose_1.default.model("hd", schema);
