export interface IFile {
  _id: string;
  usageType: string;
  filePath: string;
  mimeType?: string;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
}
