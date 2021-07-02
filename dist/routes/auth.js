"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const validationForm_1 = __importDefault(require("../middlewares/validationForm"));
const router = express_1.Router();
router.post('/', [
    express_validator_1.check('email', 'Add valid email').isEmail(),
    express_validator_1.check('password', 'Password must be at least 6 characteres').isLength({ min: 6 }),
    validationForm_1.default
], auth_1.authUser);
exports.default = router;
//# sourceMappingURL=auth.js.map