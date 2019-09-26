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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("../util/winston");
const BaseController_1 = require("./BaseController");
//import { HdRepository } from "../repository/HdRepository";
const HdRepository2_1 = require("../repository/HdRepository2");
const express = __importStar(require("express"));
class HdController extends BaseController_1.BaseController {
    constructor() {
        super();
        this.prefix = "/hd";
        this.initializeRoutes = () => {
            winston_1.logger.debug("Initializing routers for hd");
            this.router.get(`${this.prefix}/count`, this.count);
            this.router.get(`${this.prefix}/get`, this.get);
            this.router.get(`${this.prefix}/getAll`, this.getAll);
            this.router.get(`${this.prefix}/page`, this.page);
            this.router.get(`${this.prefix}/getByHd`, this.getByHdNumber);
        };
        this.count = (req, res) => __awaiter(this, void 0, void 0, function* () {
            winston_1.logger.debug("HdController: entered count()");
            const count = yield this.hdRepository.count();
            const result = { count: count };
            res.send(result);
        });
        this.getByHdNumber = (req, res) => __awaiter(this, void 0, void 0, function* () {
            winston_1.logger.debug("HDController: Entered getByHdNumber");
            const hdNumber = parseInt(req.query.hdNumber, 10);
            try {
                const result = yield this.hdRepository.getByHdNumber(hdNumber);
                res.json(result);
            }
            catch (err) {
                res.send(`Error occurred: ${err}`);
            }
        });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //const result : HD = await this.hdRepository.get(req.query.hd);
            //res.send(JSON.stringify(result));
        });
        this.getAll = (req, res) => {
        };
        this.page = (req, res) => {
        };
        this.initStore = () => {
        };
        winston_1.logger.debug("Initializing HdController");
        this.router = express.Router();
        this.hdRepository = new HdRepository2_1.HdRepository();
        this.initializeRoutes();
    }
}
exports.HdController = HdController;
