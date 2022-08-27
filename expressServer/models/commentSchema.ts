//commentSchema
const mongoose = require('mongoose');
const Schema = mongoose.Schema

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

export default mongoose.model("comment",commentSchema);