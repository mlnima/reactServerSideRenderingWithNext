'use server';
import { connectToDatabase, userSchema, fileSchema } from '@repo/db';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';
import { getCurrentDatePath } from '@repo/utils/dist/src';
import path from 'path';
import { mkdir, writeFile, unlink } from 'fs/promises';

import mime from 'mime-types';

const uploadUserProfileImage = async ({
  file,
}: {
  file: FormData;
}): Promise<
  ServerActionResponse<{
    filePath: string;
  } | null>
> => {
  try {
    const { isAuth, userId } = await verifySession();

    if (!isAuth) {
      return errorResponse({
        message: 'You Need To Log In',
      });
    }

    const formFile = file.get('file');
    if (!formFile || !(formFile instanceof File)) {
      return errorResponse({ message: 'Invalid file' });
    }

    await connectToDatabase('uploadUserProfileImage');

    let fileUrl: string;
    const user = await userSchema
      .findById(userId)
      .select('profileImage')
      .populate({
        path: 'profileImage',
        select: 'filePath',
        model: 'file',
        options: { strictPopulate: false },
      })
      .exec();

    if (user?.profileImage?._id) {
      const oldFilePath = user.profileImage.filePath;
      const absoluteOldFilePath = path.join(process.cwd(), '..', 'api-server', oldFilePath);
      await fileSchema.findByIdAndDelete(user.profileImage._id).exec();

      try {
        await unlink(absoluteOldFilePath);
      } catch (unlinkErr) {
        console.warn(`Could not delete old file at ${absoluteOldFilePath}`, unlinkErr);
      }
    }

    const datePath = getCurrentDatePath('ym');
    const relativeUploadPath = `/public/uploads/images/${datePath}`;
    const publicUploadPath = path.join(process.cwd(), '..', 'api-server', 'public', 'uploads', 'images', datePath);
    await mkdir(publicUploadPath, { recursive: true });
    const arrayBuffer = await formFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileFullPath = path.join(publicUploadPath, formFile.name);
    await writeFile(fileFullPath, buffer);

    fileUrl = `${relativeUploadPath}/${formFile.name}`;

    const mimeType = mime.lookup(fileUrl);

    const fileDocumentToSave = new fileSchema({
      usageType: 'profileImage',
      filePath: fileUrl,
      mimeType,
    });

    const savedFileDocument = await fileDocumentToSave.save();

    await userSchema.findByIdAndUpdate(userId, { $set: { profileImage: savedFileDocument._id } }).exec();

    return successResponse({
      data: {
        filePath: fileUrl,
      },
    });
  } catch (error) {
    console.error(`uploadUserProfileImage => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default uploadUserProfileImage;
