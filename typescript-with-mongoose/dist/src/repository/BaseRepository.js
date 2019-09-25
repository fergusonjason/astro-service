"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config = __importStar(require("../../config/dev.json"));
const mongoose_1 = __importDefault(require("mongoose"));
class BaseRepository {
    constructor() {
        this.uri = config.mongodb.uri;
        mongoose_1.default.connect(this.uri, { useNewUrlParser: true });
    }
    exists(collectionName) {
        return true;
    }
}
exports.BaseRepository = BaseRepository;
