import mongoose from "mongoose";
const Schema = mongoose.Schema

const actorSchema = new Schema({
    name:{
        type:String,
        unique:true
    },
    description: String,
    status: String,
    imageUrl:String,
    translations:mongoose.Mixed,
    count:Number,
    additionalInfo:mongoose.Mixed

},{ timestamps: true });

module.exports = mongoose.model("actor", actorSchema);