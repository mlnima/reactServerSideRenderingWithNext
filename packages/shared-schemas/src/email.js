const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
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
    read:{
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['sent', 'received', 'trash', 'draft', 'archived', 'spam'],
        default: 'sent'
    },
    attachments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'file'
    }]
}, { timestamps: true });

module.exports = mongoose.model('email', EmailSchema);
