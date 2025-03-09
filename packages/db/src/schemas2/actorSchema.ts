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
    translations:Schema.Types.Mixed,
    count:Number,
    additionalInfo:Schema.Types.Mixed

},{ timestamps: true });

export default mongoose.model("actor", actorSchema);