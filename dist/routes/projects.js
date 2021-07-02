"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const project_1 = require("../controllers/project");
const validationForm_1 = __importDefault(require("../middlewares/validationForm"));
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const validationDb_1 = require("../middlewares/validationDb");
const router = express_1.Router();
router.get('/', [
    authentication_1.default,
    validationForm_1.default
], project_1.getProjects);
router.post('/', [
    authentication_1.default,
    express_validator_1.check('name', 'Enter a topic for your project').not().isEmpty(),
    validationForm_1.default
], project_1.createProject);
router.put('/:id', [
    authentication_1.default,
    express_validator_1.check('id', 'Id not valid').isMongoId(),
    express_validator_1.check('id').custom(validationDb_1.findId),
    validationDb_1.validateIdCreator,
    validationForm_1.default
], project_1.updateProject);
router.delete('/:id', [
    authentication_1.default,
    express_validator_1.check('id', 'Id not valid').isMongoId(),
    express_validator_1.check('id').custom(validationDb_1.findId),
    validationForm_1.default
], project_1.deleteProject);
exports.default = router;
//# sourceMappingURL=projects.js.map