"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const HD2_1 = require("../model/HD2");
const BaseRepository2_1 = require("./BaseRepository2");
const winston_1 = require("../util/winston");
class HdRepository extends BaseRepository2_1.BaseRepository {
    constructor() {
        super(HD2_1.hdModel);
        this.collectionExists = () => __awaiter(this, void 0, void 0, function* () {
            const collections = yield mongoose_1.default.connection.db.listCollections({ name: "hds" });
            if (collections) {
                return true;
            }
            else {
                return false;
            }
        });
        this.getByHdNumber = (hdNumber) => __awaiter(this, void 0, void 0, function* () {
            winston_1.logger.debug("Entered getByHdNumber");
            const result = yield this._model.findOne({ HD: hdNumber });
            return result;
        });
    }
}
exports.HdRepository = HdRepository;
