import mongoose, { Schema, models, model } from "mongoose";

// Define interfaces for the schemas
interface ISystemMessage {
    message: string;
    type: string;
    createdAt: Date;
}

interface IMessage {
    messageBody: string;
    author: any; // Assuming ObjectId type
    createdAt: Date;
}

interface IConversation extends Document {
    users: any[]; // Assuming ObjectId array type
    messages: IMessage[];
    systemMessages: ISystemMessage[];
}

// Define the system message schema
const systemMessageSchema = new Schema<ISystemMessage>({
    message: String,
    type: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

// Define the message schema
const messageSchema = new Schema<IMessage>({
    messageBody: String,
    author: {type: Schema.Types.ObjectId, ref: 'user'},
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

// Define the conversation schema
const conversationSchema = new Schema<IConversation>({
    users: [{type: Schema.Types.ObjectId, ref: 'user'}],
    messages: [messageSchema],
    systemMessages: [systemMessageSchema]
}, { timestamps: true });

const ConversationModel = models?.conversation || model<IConversation>("conversation", conversationSchema);

export default ConversationModel;
// import mongoose from "mongoose";
//
// const Schema = mongoose.Schema
//
//
// //old schema it will be replace with conversationMessageSchema and after convert
// const systemMessage = new mongoose.Schema({
//     message: String,
//     type: String,
//     createdAt: {
//         type: Date,
//         default: Date.now()
//     }
// })
//
// const messageSchema = new mongoose.Schema({
//     messageBody: String,
//     author: {type: Schema.Types.ObjectId, ref: 'user'},
//     createdAt: {
//         type: Date,
//         default: Date.now()
//     }
// })
//
// const conversationSchema = new mongoose.Schema({
//     users: [{type: Schema.Types.ObjectId, ref: 'user'}],
//     messages: [messageSchema],
//     systemMessages: [systemMessage]
// }, {timestamps: true})
//
// export default mongoose.model("conversation", conversationSchema)