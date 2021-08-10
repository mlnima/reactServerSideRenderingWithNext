//commentSchema
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const commentSchema = Schema({
    onDocumentId: {type:Schema.Types.ObjectID,ref:'post'},
    author:{type:Schema.Types.ObjectID,ref:'user'},
    body: String,
    status:{
        type:String,
        default: 'approved'
    }
},{ timestamps: true });

module.exports = mongoose.model("comment",commentSchema);