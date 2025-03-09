import mongoose from "mongoose";
const Schema = mongoose.Schema;

const settingSchema = new Schema({
    type: {
        type:String,
        unique:true
    },
    data:Schema.Types.Mixed,
});

export default mongoose.model("settings", settingSchema);