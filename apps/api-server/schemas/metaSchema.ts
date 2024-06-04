import mongoose from "mongoose";
const Schema = mongoose.Schema

const metaSchema =  new Schema({
    name:{
        type:String,
        trim:true,
        uppercase: false
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
    additionalInfo:Schema.Types.Mixed,
    parentId: {
        type: Schema.Types.ObjectId,
        ref: 'meta'
    }
},{ timestamps: true });

metaSchema.index({ name: 1, type: 1 }, { unique: true });

export default mongoose.model("meta", metaSchema);