"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var mongoose_1 = tslib_1.__importDefault(require("mongoose"));
var messengerConversationMessageSchema = new mongoose_1["default"].Schema({
    type: {
        type: String,
        required: false,
        "enum": ['privateMessage', 'eventLog'],
        "default": 'privateMessage'
    },
    conversation: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: 'messengerConversation',
        required: true
    },
    sender: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imageContent: {
        type: String
    },
    audioContent: {
        type: String
    },
    isRead: {
        type: Boolean,
        "default": false
    },
    //in order to convert the old messages
    createdAt: {
        type: Date,
        "default": Date.now
    },
    updatedAt: {
        type: Date,
        "default": Date.now
    }
}, { timestamps: true });
exports["default"] = mongoose_1["default"].model("messengerConversationMessage", messengerConversationMessageSchema);
