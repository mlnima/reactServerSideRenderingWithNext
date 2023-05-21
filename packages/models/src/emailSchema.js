"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var emailSchema = new mongoose_1.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    receiver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    subject: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    html: {
        type: String
    },
    read: {
        type: Boolean,
        "default": false
    },
    status: {
        type: String,
        "enum": ['sent', 'received', 'trash', 'draft', 'archived', 'spam'],
        "default": 'sent'
    },
    attachments: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'file'
        }]
}, { timestamps: true });
exports["default"] = (0, mongoose_1.model)('email', emailSchema);
