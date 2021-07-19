//commentSchema
const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    onDocumentId: {type:mongoose.Schema.Types.ObjectID,ref:'post'},
    onDocumentTitle: String,
    author: String,
    authorID:mongoose.Types.ObjectId,
    email:String,
    body: String,
    postedDate:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String,
        default: 'approved'
    }
},{ timestamps: true });

module.exports = mongoose.model("comments",commentSchema);