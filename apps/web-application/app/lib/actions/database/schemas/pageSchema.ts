import mongoose, { Schema, models, model } from "mongoose";

const pageSchema = new Schema({
    pageName: {
        type: String,
        unique: true
    },
    title: String,
    description: String,
    keywords: String,
    sidebar: String,
    status: String,
    imageUrl: String,
    translation: Schema.Types.Mixed,
    pageStyle: String
}, { timestamps: true });

const PageModel = models?.page || model("page", pageSchema);

export default PageModel;

// import mongoose from "mongoose";
// const Schema = mongoose.Schema
//
// const pageSchema =  new Schema({
//     pageName:{
//         type:String,
//         unique:true
//     },
//     title:String,
//     description:String,
//     keywords:String,
//     sidebar:String,
//     status: String,
//     imageUrl:String,
//     translation:Schema.Types.Mixed,
//     pageStyle:String
// }, {timestamps: true});
//
// export default mongoose.model("page", pageSchema);