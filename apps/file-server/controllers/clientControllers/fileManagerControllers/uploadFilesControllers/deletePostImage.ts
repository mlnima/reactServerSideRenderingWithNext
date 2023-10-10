import {fileSchema, postSchema} from "models";
import path from "path";

const fsExtra = require('fs-extra');

const deleteFile = async (filePath) => {
    try {
        console.log('console=> ',path.join(__dirname, '../../../../', filePath))
        await fsExtra.unlink(path.join(__dirname, '../../../../', filePath));
        console.log('File deleted successfully', filePath);
    } catch (err) {
        console.error(`Error deleting file: ${err}`);
        throw err;
    }
};


const deletePostImage = async (req, res) => {
    try {
        const imageId = req.query.imageId;
        const thumbnailToReplace = req.query.thumbnailToReplace;
        const postId = req.query.postId;

        const postDocument = postId ? await postSchema.findById(postId) : null;
        const imageDocument = imageId ? await fileSchema.findById(imageId) : null;

        if (
            req.userData?._id?.toString() !== postDocument?.author?.toString() ||
            (
                req.userData?._id?.toString() !== postDocument?.author?.toString() &&
                req.userData?.role !== 'administrator'
            )
        ) {
            res.status(401).json({
                message: 'Unauthorized'
            });
            return;
        }


        if (!imageDocument || !postDocument) {
            res.status(404).json({
                message: 'Post or image not found'
            });
            return;
        }

        if (imageDocument.filePath && imageDocument.filePath.startsWith('/public/')) {
            await deleteFile(imageDocument.filePath);

            const updateObj = {$pull: {images: imageId}};

            if (thumbnailToReplace) {
                updateObj['mainThumbnail'] = thumbnailToReplace;
            }

            await postSchema.findByIdAndUpdate(postId, updateObj, {new: true}).exec();
            await fileSchema.findByIdAndDelete(imageId).exec();

            res.status(200).json({
                message: 'Image deleted successfully'
            });
            return;
        } else {
            res.status(400).json({
                message: 'Invalid filePath: Must start with /public/'
            });
            return;
        }


        // res.end()

    } catch (error) {
        console.log('deletePostImage error=> ', error);
        res.status(500).json({
            message: 'Internal Server Error'
        });
        return;
    }
};

export default deletePostImage;


// const deletePostImage = async (req, res) => {
//     try {
//         const imageId = req.query.imageId;
//         const thumbnailToReplace = req.query.thumbnailToReplace;
//         const postDocument = req.query.postId ? await postSchema.findById(req.query.postId) : null
//         const imageDocument = req.query.imageId ? await fileSchema.findById(imageId) : null
//
//         if (imageDocument && postDocument) {
//             if (imageDocument?.filePath && imageDocument.filePath.startsWith('/public/')) {
//                 await deleteFile(imageDocument?.filePath)
//                 if (thumbnailToReplace) {
//                     await postSchema.findByIdAndUpdate(
//                         req.query.postId,
//                         {$and: [{$pull: {images: imageId}}, {mainThumbnail: thumbnailToReplace}]}, {new: true}).exec()
//                 } else {
//                     await postSchema.findByIdAndUpdate(
//                         req.query.postId,
//                         {$and: [{$pull: {images: imageId}}]}, {new: true}).exec()
//                 }
//                 await fileSchema.findByIdAndDelete(imageId);
//                 res.status(200).json({
//                     message: 'Image deleted successfully'
//                 })
//             }
//         }
//
//
//     } catch (error) {
//         console.log('deletePostImage error=> ', error)
//     }
// }