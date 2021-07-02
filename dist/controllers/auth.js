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
exports.authUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const generate_jwt_1 = __importDefault(require("../helpers/generate-jwt"));
const authUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        //check if a user exists
        let user = yield User_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({
                msg: 'User doesnt exist'
            });
        }
        //password
        const correctPass = yield bcryptjs_1.default.compare(password, (user === null || user === void 0 ? void 0 : user.password) || '');
        if (!correctPass) {
            return res.status(400).json({
                msg: 'Incorrect Password'
            });
        }
        //jsonwebtoken
        const token = yield generate_jwt_1.default(user === null || user === void 0 ? void 0 : user._id);
        res.status(200).json({
            msg: 'Auth success',
            token
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.authUser = authUser;
//# sourceMappingURL=auth.js.map