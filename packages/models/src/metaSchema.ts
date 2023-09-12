import mongoose from "mongoose";
const Schema = mongoose.Schema

const metaSchema =  new Schema({
    name:{
        type:String,
        uppercase: false,
    },
    type: String,
    index:Number,
    description: String,
    status: {
        type:String,
        uppercase: false,
    },
    imageUrl:String,
    coverImageUrl:String,
    imageUrlLock:Boolean,
    icon:String,
    rankLock:Boolean,
    translations:Schema.Types.Mixed,
    count:Number,
    likes:Number,
    views:Number,
    rank:Number,
    additionalInfo:Schema.Types.Mixed

},{ timestamps: true });

export default mongoose.model("meta", metaSchema);