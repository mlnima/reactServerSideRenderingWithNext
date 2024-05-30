const mongoose = require('mongoose');

const MessengerConversationSchema = new mongoose.Schema({
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'messengerConversationMessage'}],
    status: {
        type: String,
        required: false,
        enum: ['restricted', 'active', 'archived'],
        default:'active'
    },
    //in order to convert the old conversations
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {timestamps: true})

module.exports = mongoose.model("messengerConversation", MessengerConversationSchema)