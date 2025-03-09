import mongoose, { models, model } from "mongoose";
const Schema = mongoose.Schema;

const LogSchema = new Schema({
    type: {
        type: String,
        url: String,
        enum: ['log', 'error']
    },
}, { timestamps: true });

const LogModel = models?.log || model("log", LogSchema);

export default LogModel;
// import mongoose from "mongoose";
// const Schema = mongoose.Schema
//
// const LogSchema =  new Schema({
//     type: {
//         type:String,
//         url:String,
//         enum:['log','error']
//     },
// },{ timestamps: true });
//
// export default mongoose.model("log", LogSchema);