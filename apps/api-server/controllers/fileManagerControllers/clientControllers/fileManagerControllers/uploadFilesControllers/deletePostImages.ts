// @ts-nocheck
import path from 'path';
import fsExtra from 'fs-extra';
import postSchema from '@schemas/postSchema';
import fileSchema from '@schemas/fileSchema';
import { Request, Response } from 'express';

const deleteFile = async (filePath: string) => {
    try {
        await fsExtra.unlink(path.join(__dirname, '../../../../', filePath));
        console.log('File deleted successfully', filePath);
    } catch (err) {
        console.error(`Error deleting file: ${err}`);
        throw err;
    }
};

const deletePostImages = async (req: Request, res: Response) => {
    try {
        const postId = req.query.postId;
        const postDocument = postId
            ? await postSchema
                  .findById(postId)
                  .select('images author')
                  .populate([
                      {
                          path: 'images',
                          select: { filePath: 1 },
                          model: 'file',
                      },
                      // { path: 'author',  model: 'user' },
                  ])
                  .exec()
            : null;

        if (
            req.userData?._id?.toString() !==
                postDocument?.author?.toString() ||
            (req.userData?._id?.toString() !==
                postDocument?.author?.toString() &&
                req.userData?.role !== 'administrator')
        ) {
            res.status(401).json({
                message: 'Unauthorized',
            });
            return;
        }

        if (!postDocument) {
            res.status(404).json({
                message: 'Post or image not found',
            });
            return;
        }

        if (postDocument?.images?.length > 0) {
            for await (const imageDocument of postDocument?.images) {
                if (
                    imageDocument.filePath &&
                    imageDocument.filePath.startsWith('/public/')
                ) {
                    try {
                        await deleteFile(imageDocument.filePath);
                        await fileSchema
                            .findByIdAndDelete(imageDocument?._id)
                            .exec();
                        console.log(
                            imageDocument?._id,
                            'image deleted successfully',
                        );
                    } catch (error) {
                        console.log('error=> ', error);
                    }
                }
            }
        }

        res.status(200).json({
            message: 'Image deleted successfully',
        });
        return;
    } catch (error) {
        console.log('deletePostImage error=> ', error);
        res.status(500).json({
            message: 'Internal Server Error',
        });
        return;
    }
};

export default deletePostImages;

// if (imageDocument.filePath && imageDocument.filePath.startsWith('/public/')) {
//     await deleteFile(imageDocument.filePath);
//
//     const updateObj = {$pull: {images: imageId}};
//
//     if (thumbnailToReplace) {
//         updateObj['mainThumbnail'] = thumbnailToReplace;
//     }
//
//     await postSchema.findByIdAndUpdate(postId, updateObj, {new: true}).exec();
//     await fileSchema.findByIdAndDelete(imageId);
//
//     res.status(200).json({
//         message: 'Image deleted successfully'
//     });
//     return;
// } else {
//     res.status(400).json({
//         message: 'Invalid filePath: Must start with /public/'
//     });
//     return;
// }
//

// res.end()
