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
exports.validateIdCreator = exports.findId = void 0;
const Project_1 = __importDefault(require("../models/Project"));
const findId = (id = '') => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield Project_1.default.findById(id);
    if (!project) {
        throw new Error('ID not valid');
    }
});
exports.findId = findId;
const validateIdCreator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const project = (yield Project_1.default.findById(req.params.id)) || null;
    if ((project === null || project === void 0 ? void 0 : project.creator.toString()) !== req.id) {
        res.status(401).json({
            msg: 'Not authorized'
        });
    }
    next();
});
exports.validateIdCreator = validateIdCreator;
//# sourceMappingURL=validationDb.js.map