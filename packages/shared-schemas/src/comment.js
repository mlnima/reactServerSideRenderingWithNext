const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    onDocumentId: {type:mongoose.Schema.Types.ObjectId,ref:'post'},
    author:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
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

module.exports = mongoose.model("comment",CommentSchema);