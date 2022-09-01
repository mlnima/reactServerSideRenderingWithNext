import {model, Schema, Document} from "mongoose";
import {CommentRaw} from "@_typeScriptTypes/Comment";

const commentSchema = new Schema({
    onDocumentId: {type:Schema.Types.ObjectId,ref:'post'},
    author:{type:Schema.Types.ObjectId,ref:'user'},
    reply:[],
    likes:{
        type: Number,
        default: 0
    },
    disLikes:{
        type: Number,
        default: 0
    },
    body: String,
    status:{
        type:String,
        default: 'approved'
    }
},{ timestamps: true });

export default model<CommentRaw & Document>("comment",commentSchema);