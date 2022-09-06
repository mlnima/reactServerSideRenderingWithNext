"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var commentSchema = new mongoose_1.Schema({
    onDocumentId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'post' },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' },
    reply: [],
    likes: {
        type: Number,
        default: 0
    },
    disLikes: {
        type: Number,
        default: 0
    },
    body: String,
    status: {
        type: String,
        default: 'approved'
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("comment", commentSchema);
//# sourceMappingURL=commentSchema.js.map