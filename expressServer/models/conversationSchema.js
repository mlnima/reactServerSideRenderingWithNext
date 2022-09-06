"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var systemMessage = mongoose.Schema({
    message: String,
    type: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
var messageSchema = mongoose.Schema({
    messageBody: String,
    author: { type: Schema.Types.ObjectID, ref: 'user' },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
var conversationSchema = mongoose.Schema({
    users: [{ type: Schema.Types.ObjectID, ref: 'user' }],
    messages: [messageSchema],
    systemMessages: [systemMessage]
}, { timestamps: true });
exports.default = mongoose.model("conversation", conversationSchema);
//# sourceMappingURL=conversationSchema.js.map