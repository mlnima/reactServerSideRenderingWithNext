import mongoose from "mongoose";
const Schema = mongoose.Schema

const messengerConversationSchema = new mongoose.Schema({
    users: [{type: Schema.Types.ObjectId, ref: 'user'}],
    messages: [{type: Schema.Types.ObjectId, ref: 'messengerConversationMessage'}],
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

export default mongoose.model("messengerConversation", messengerConversationSchema)