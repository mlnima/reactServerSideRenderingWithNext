import mongoose from "mongoose";
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name:{
        type:String,
        unique:true
    },
    description: String,
    status: String,
    imageUrl:String,
    translations:mongoose.Mixed,
    count:Number,

},{ timestamps: true });


module.exports = mongoose.model("category", categorySchema);