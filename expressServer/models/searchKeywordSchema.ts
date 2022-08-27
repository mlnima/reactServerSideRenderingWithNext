import mongoose from "mongoose";
const Schema = mongoose.Schema

const metaSchema =  new Schema({
    name:{
        type:String,
        uppercase: false,
        unique:true
    },
    description: String,
    count:Number

},{ timestamps: true });

export default mongoose.model("searchKeyword", metaSchema);