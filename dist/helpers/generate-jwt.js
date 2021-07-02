"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (id = '') => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        //Sign jwt
        jsonwebtoken_1.default.sign(payload, `${process.env.SECRETORPRIVATEKEY}`, {
            expiresIn: 360000
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('Token in generating token');
            }
            else {
                resolve(token || '');
            }
        });
    });
};
exports.default = generateJWT;
//# sourceMappingURL=generate-jwt.js.map