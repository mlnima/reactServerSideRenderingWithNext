import {model, Schema, Document} from "mongoose";
import {IEmail} from "typescript-types";

const emailSchema = new Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    sender: {
        type: Schema.Types.ObjectId,
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
        type: Schema.Types.ObjectId,
        ref: 'file'
    }]
}, { timestamps: true });

export default model<IEmail & Document>('email', emailSchema);
