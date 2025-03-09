import mongoose, { Schema, models, model } from "mongoose";

const settingSchema = new Schema({
  type: {
    type: String,
    unique: true
  },
  data: Schema.Types.Mixed,
});

const SettingModel = models?.settings || model("settings", settingSchema);

export default SettingModel;

//
// import mongoose from "mongoose";
// const Schema = mongoose.Schema;
//
// const settingSchema = new Schema({
//     type: {
//         type:String,
//         unique:true
//     },
//     data:Schema.Types.Mixed,
// });
//
// export default mongoose.model("settings", settingSchema);
//

