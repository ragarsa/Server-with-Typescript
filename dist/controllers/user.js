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
exports.postUsers = exports.getUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const getUsers = (req, res) => {
    res.json({ msg: 'Router' });
};
exports.getUsers = getUsers;
const postUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = req.body;
    const { email, password } = post;
    try {
        let user = yield User_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({
                msg: 'User found in database'
            });
        }
        user = new User_1.default(req.body);
        //Hashear password 
        const salt = yield bcryptjs_1.default.genSalt(10);
        user.password = yield bcryptjs_1.default.hash(password, salt);
        //Save user
        yield user.save();
        res.json({
            msg: 'User created'
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Sth gone wrong'
        });
    }
});
exports.postUsers = postUsers;
//# sourceMappingURL=user.js.map