'use server';
import { connectToDatabase, userSchema,fileSchema } from '@repo/db';
import { errorResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';
import { getCurrentDatePath } from '@repo/utils';
import path from 'path';
import { mkdir, writeFile,unlink  } from 'fs/promises';
// @ts-expect-error: it's fine
import mime from 'mime-types';


const uploadUserProfileImage = async ({ file }: { file: FormData }) => {
  try {
    const { isAuth, userId } = await verifySession();

    if (!isAuth) {
      return errorResponse({
        message: 'You Need To Log In',
      });
    }

    await connectToDatabase('uploadUserProfileImage');

    const user = await userSchema.findById(userId)
      .select('profileImage')
      .populate({
      path: 'profileImage',
      select: 'filePath',
      model: 'file',
      options: { strictPopulate: false },
    })

    if (user?.profileImage?._id){
      const oldFilePath = user.profileImage.filePath;
      const absoluteOldFilePath = path.join(process.cwd(), oldFilePath);

      await fileSchema.findByIdAndDelete(user?.profileImage?._id)

      try {
        await unlink(absoluteOldFilePath);
      } catch (unlinkErr) {
        console.warn(`Could not delete old file at ${absoluteOldFilePath}`, unlinkErr);
      }
    }

    const formFile = file.get('file');
    if (!formFile || !(formFile instanceof File)) {
      return errorResponse({ message: 'Invalid file' });
    }

    const datePath = getCurrentDatePath('ym');
    const relativeUploadPath = `/public/uploads/images/${datePath}`;
    const publicUploadPath = path.join(process.cwd(), 'public', 'uploads', 'images', datePath);

    await mkdir(publicUploadPath, { recursive: true });

    const arrayBuffer = await formFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileFullPath = path.join(publicUploadPath, formFile.name);
    await writeFile(fileFullPath, buffer);

    const fileUrl = `${relativeUploadPath}/${formFile.name}`;

    const mimeType = mime.lookup(fileUrl)

    const fileDocumentToSave = new fileSchema({
      usageType: 'profileImage',
      filePath: fileUrl,
      mimeType,
    });

    const savedFileDocument = await fileDocumentToSave.save()

    await userSchema.findByIdAndUpdate(userId,{$set:{profileImage:savedFileDocument._id}})

    return successResponse({
      data: {
        filePath: fileUrl,
      },
    });
  } catch (error) {

  }
};

export default uploadUserProfileImage;

