"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var mongoose_1 = tslib_1.__importDefault(require("mongoose"));
var Schema = mongoose_1["default"].Schema;
var messengerConversationSchema = new mongoose_1["default"].Schema({
    users: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'messengerConversationMessage' }],
    status: {
        type: String,
        required: false,
        "enum": ['restricted', 'active', 'archived'],
        "default": 'active'
    },
    //in order to convert the old conversations
    createdAt: {
        type: Date,
        "default": Date.now
    },
    updatedAt: {
        type: Date,
        "default": Date.now
    }
}, { timestamps: true });
exports["default"] = mongoose_1["default"].model("messengerConversation", messengerConversationSchema);
