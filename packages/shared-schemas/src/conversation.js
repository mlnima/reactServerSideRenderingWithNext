const mongoose = require('mongoose');

const SystemMessage = new mongoose.Schema({
    message: String,
    type: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const MessageSchema = new mongoose.Schema({
    messageBody: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const ConversationSchema = new mongoose.Schema({
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    messages: [MessageSchema],
    systemMessages: [SystemMessage]
}, {timestamps: true})

module.exports = mongoose.model("conversation", ConversationSchema)