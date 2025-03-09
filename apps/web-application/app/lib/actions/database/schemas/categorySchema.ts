import mongoose, { Schema, models, model } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    description: String,
    status: String,
    imageUrl: String,
    translations: Schema.Types.Mixed,
    count: Number,
}, { timestamps: true });

const CategoryModel = models?.category || model("category", categorySchema);

export default CategoryModel;

// import mongoose from "mongoose";
// const Schema = mongoose.Schema
//
// const categorySchema = new Schema({
//     name:{
//         type:String,
//         unique:true
//     },
//     description: String,
//     status: String,
//     imageUrl:String,
//     translations:Schema.Types.Mixed,
//     count:Number,
//
// },{ timestamps: true });
//
//
// export default mongoose.model("category", categorySchema);