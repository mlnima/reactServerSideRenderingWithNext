"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
// import {userSchema} from 'models'
var chatroomMessageSchema = new mongoose_1.Schema({
    chatroom: { type: mongoose_1.Schema.Types.ObjectId, ref: 'chatroom' },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' },
    type: String,
    messageData: String
}, { timestamps: true });
exports["default"] = (0, mongoose_1.model)("chatroomMessage", chatroomMessageSchema);