"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var chatroomSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        unique: true
    },
    messages: Array
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("chatroom", chatroomSchema);
//# sourceMappingURL=chatroomSchema.js.map