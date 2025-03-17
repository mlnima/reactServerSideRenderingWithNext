import { Schema, models, model } from 'mongoose';

const actorSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  description: String,
  status: String,
  imageUrl: String,
  translations: Schema.Types.Mixed,
  count: Number,
  additionalInfo: Schema.Types.Mixed,
}, { timestamps: true });

const ActorModel = models?.actor || model('actor', actorSchema);

export default ActorModel;
