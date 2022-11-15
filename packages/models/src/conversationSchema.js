"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var mongoose_1 = tslib_1.__importDefault(require("mongoose"));
var Schema = mongoose_1["default"].Schema;
var systemMessage = new mongoose_1["default"].Schema({
    message: String,
    type: String,
    createdAt: {
        type: Date,
        "default": Date.now()
    }
});
var messageSchema = new mongoose_1["default"].Schema({
    messageBody: String,
    author: { type: Schema.Types.ObjectId, ref: 'user' },
    createdAt: {
        type: Date,
        "default": Date.now()
    }
});
var conversationSchema = new mongoose_1["default"].Schema({
    users: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    messages: [messageSchema],
    systemMessages: [systemMessage]
}, { timestamps: true });
exports["default"] = mongoose_1["default"].model("conversation", conversationSchema);
