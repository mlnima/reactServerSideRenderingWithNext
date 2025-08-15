import mongoose, { models, model, Model } from 'mongoose';
import { IFile } from '@repo/typescript-types';

const Schema = mongoose.Schema;

const fileSchema = new Schema(
  {
    usageType: String,
    filePath: {
      type: String,
      required: true,
    },
    mimeType: String,
    status: String,
  },
  { timestamps: true },
);

const FileModel = (models?.file || model('file', fileSchema)) as Model<IFile>;

export default FileModel;
