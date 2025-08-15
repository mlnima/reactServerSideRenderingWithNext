import { Schema, models, model, Model } from 'mongoose';

const settingSchema = new Schema({
  type: {
    type: String,
    unique: true,
  },
  data: Schema.Types.Mixed,
});

const SettingModel = (models?.settings || model('settings', settingSchema)) as Model<any>;

export default SettingModel;
