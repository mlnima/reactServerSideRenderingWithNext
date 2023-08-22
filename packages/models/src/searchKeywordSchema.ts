import mongoose from "mongoose";
const Schema = mongoose.Schema

const searchKeywordSchema =  new Schema({
    name:{
        type:String,
        uppercase: false,
        unique:true
    },
    count:Number,
    searchHits:Number

},{ timestamps: true });

export default mongoose.model("searchKeyword", searchKeywordSchema);