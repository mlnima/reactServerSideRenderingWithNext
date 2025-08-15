import { Schema, models, model, Model } from 'mongoose';

interface ITag extends Document {
  name: string;
  description: string;
  status: string;
  imageUrl: string;
  translations: any;
  count: number;
}

const tagSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    description: String,
    status: String,
    imageUrl: String,
    translations: Schema.Types.Mixed,
    count: Number,
  },
  { timestamps: true },
);

const TagModel = (models?.tag || model<ITag>('tag', tagSchema)) as Model<any>;

export default TagModel;
