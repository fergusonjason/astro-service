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
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRepository {
    constructor(model) {
        this.create = (obj) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this._model.create(obj);
            return result;
        });
        this.count = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this._model.collection.countDocuments();
            return result;
        });
        this.find = (obj) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this._model.find(obj);
            return result;
        });
        this._model = model;
    }
}
exports.BaseRepository = BaseRepository;
