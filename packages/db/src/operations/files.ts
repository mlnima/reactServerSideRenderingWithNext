import { join } from 'path';
import { existsSync, unlinkSync } from 'fs';
import { getCurrentDatePath } from '@repo/utils';
import fsExtra from 'fs-extra';
import fileSchema from '../schemas/fileSchema';
import postSchema from '../schemas/postSchema';
import { UploadedFile } from 'express-fileupload';

export const saveFileExpress = async (files: File[]) => {
  try {
    for await (const file of files) {
      console.log(`file=> `, file);
    }
    return {
      success: true,
      message: `Saved files ${files.length}`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error saving files ${files.length}`,
    };
  }
};

interface ISavePostMedia {
  files: {
    videoFile?: UploadedFile;
    imageFile?: UploadedFile;
  };
  postId: string;
}

export const savePostMedia = async ({ files, postId }: ISavePostMedia) => {
  try {
    const { videoFile, imageFile } = files;
    const currentDatePath = getCurrentDatePath();

    let savedFilesData = {
      thumbnail: null,
      video: null,
    };

    if (videoFile) {
      const fileType = videoFile.name.split('.')[1];
      const targetFileName = `${postId}.${fileType}`;
      const targetDirectoryAbsolutePath = join(process.cwd(), 'public', 'uploads', 'videos', currentDatePath);
      const fileUrlPath = `/public/uploads/videos/${currentDatePath}/${targetFileName}`;
      const videoPath = join(targetDirectoryAbsolutePath, `${targetFileName}`);
      await fsExtra.ensureDir(targetDirectoryAbsolutePath);

      if (existsSync(videoPath)) {
        unlinkSync(videoPath);
      }
      await videoFile.mv(videoPath);

      const fileDocumentToSave = new fileSchema({
        filePath: fileUrlPath,
        mimeType: videoFile.mimetype,
        usageType: 'post',
      });

      const savedFile = await fileDocumentToSave.save();
      if (savedFile) {
        savedFilesData.video = savedFile._id;
      }
    }

    if (imageFile) {
      const fileType = imageFile.name.split('.')[1];
      const targetFileName = `${postId}.${fileType}`;
      const targetDirectoryAbsolutePath = join(process.cwd(), 'public', 'uploads', 'images', currentDatePath);
      const fileUrlPath = `/public/uploads/images/${currentDatePath}/${targetFileName}`;
      const imagePath = join(targetDirectoryAbsolutePath, `${targetFileName}`);
      await fsExtra.ensureDir(targetDirectoryAbsolutePath);

      if (existsSync(imagePath)) {
        unlinkSync(imagePath);
      }
      await imageFile.mv(imagePath);

      const fileDocumentToSave = new fileSchema({
        filePath: fileUrlPath,
        mimeType: imageFile.mimetype,
        usageType: 'post',
      });

      const savedFile = await fileDocumentToSave.save();
      if (savedFile) {
        savedFilesData.thumbnail = savedFile._id;
      }
    }

    if (savedFilesData.video || savedFilesData.thumbnail) {
      try {
        await postSchema.findByIdAndUpdate(
          postId,
          { $set: savedFilesData },
          {
            new: true,
            runValidators: true,
            context: 'query',
          },
        );
      } catch (err) {
        console.error('Update error:', err);
      }
    }

    return {
      success: true,
      message: `files Saved `,
    };
  } catch (error) {
    console.log(`error=> `, error);
    return {
      success: false,
      message: `Error saving files`,
    };
  }
};
