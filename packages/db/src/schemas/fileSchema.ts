import mongoose, { models, model } from 'mongoose';
// @ts-expect-error: mime-types may not have default TypeScript types, consider installing @types/mime-types
import mime from 'mime-types';

const Schema = mongoose.Schema;

const fileSchema = new Schema({
  usageType: String,
  filePath: {
    type: String,
    required: true,
  },
  mimeType: String,
}, { timestamps: true });

const FileModel = models?.file || model('file', fileSchema);

export default FileModel;
