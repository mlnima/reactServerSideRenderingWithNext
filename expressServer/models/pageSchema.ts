import mongoose from "mongoose";
const Schema = mongoose.Schema

const pageSchema =  new Schema({
    pageName:{
        type:String,
        unique:true
    },
    title:String,
    description:String,
    keywords:String,
    sidebar:String,
    status: String,
    imageUrl:String,
    translation:Schema.Types.Mixed,
    pageStyle:String
});

export default mongoose.model("page", pageSchema);