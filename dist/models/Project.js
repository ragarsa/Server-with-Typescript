"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProjectSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        trim: true
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
});
exports.default = mongoose_1.model('Project', ProjectSchema);
//# sourceMappingURL=Project.js.map