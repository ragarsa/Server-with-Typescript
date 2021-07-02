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
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjects = void 0;
const Project_1 = __importDefault(require("../models/Project"));
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Info extracted from jwt
    try {
        const idCreatorProject = req.id;
        const project = yield Project_1.default.find({ creator: idCreatorProject }).sort({ timestamp: -1 });
        res.status(200).json(project);
    }
    catch (error) {
        res.status(500).json({
            error
        });
    }
});
exports.getProjects = getProjects;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectUser = req.body;
        const project = new Project_1.default(projectUser);
        //save creator project by JWT
        project.creator = req.id;
        yield project.save();
        res.status(200).json({
            msg: 'Project created',
            project
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Sth gon wrong',
            error
        });
    }
});
exports.createProject = createProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    const newProject = { name: '' };
    if (name) {
        newProject.name = name;
    }
    try {
        //project creator 
        const project = yield Project_1.default.findByIdAndUpdate({ _id: id }, { $set: newProject }, { new: true });
        res.status(200).json({ project });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Server gone wrong'
        });
    }
});
exports.updateProject = updateProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield Project_1.default.findOneAndRemove({ _id: id });
        res.json({
            msg: 'Project deleted'
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Server gone wrong'
        });
    }
});
exports.deleteProject = deleteProject;
//# sourceMappingURL=project.js.map