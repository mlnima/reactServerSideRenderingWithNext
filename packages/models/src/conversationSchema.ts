import mongoose from "mongoose";

const Schema = mongoose.Schema


//old schema it will be replace with conversationMessageSchema and after convert
const systemMessage = new mongoose.Schema({
    message: String,
    type: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const messageSchema = new mongoose.Schema({
    messageBody: String,
    author: {type: Schema.Types.ObjectId, ref: 'user'},
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const conversationSchema = new mongoose.Schema({
    users: [{type: Schema.Types.ObjectId, ref: 'user'}],
    messages: [messageSchema],
    systemMessages: [systemMessage]
}, {timestamps: true})

export default mongoose.model("conversation", conversationSchema)