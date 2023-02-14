"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var chatroomSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        unique: true
    },
    title: String,
    description: String,
    tags: String,
    status: String,
    messages: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'chatroomMessage' }]
}, { timestamps: true });
exports["default"] = (0, mongoose_1.model)("chatroom", chatroomSchema);
