import mongoose from "mongoose";
const Schema = mongoose.Schema

const formSchema = new Schema({
    widgetId:Schema.Types.ObjectId,
    language:String,
    formName:String,
    data: Schema.Types.Mixed
},{ timestamps: true });

export default mongoose.model("form", formSchema);

