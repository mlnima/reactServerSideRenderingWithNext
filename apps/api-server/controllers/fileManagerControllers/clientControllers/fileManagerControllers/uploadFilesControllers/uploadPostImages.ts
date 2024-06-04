// @ts-nocheck
//-----------AI improved code------------
import {getCurrentDatePath} from "@util/path-utils";
import fsExtra from "fs-extra";

import { Request, Response } from "express";
import postSchema from "@schemas/postSchema";
import fileSchema from "@schemas/fileSchema";

const uploadPostImages = async (req: Request<{}, {}, RequestBody>, res: Response) => {
    try {
        // Validate request data
        if (!req.body?.imagesData || !req.files?.images || !req.body?.imagesData?.includes('postId')) {
            return res.status(400).json({ error: "Bad request. Missing imagesData or images." });
        }

        const parsedImagesData = JSON.parse(req.body.imagesData);
        const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
        const directoryPath = `./public/uploads/images/${getCurrentDatePath()}`;

        // Ensure directory exists
        await fsExtra.ensureDir(directoryPath);

        let responseImages = [];

        for await (const image of images) {
            try {
                // Create an empty file document
                const emptyFileDocument = new fileSchema({
                    usageType: parsedImagesData.usageType, // Use parsedImagesData instead of imagesData
                    filePath: 'temp',
                    mimeType: image.mimetype,
                });

                const savedEmptyDoc = await emptyFileDocument.save();
                const filePath = `/public/uploads/images/${getCurrentDatePath()}/${savedEmptyDoc._id}.webp`;
                await image.mv('.' + filePath);
                const updatedImageDoc = await fileSchema.findByIdAndUpdate(savedEmptyDoc._id, { filePath }, { new: true }).exec();
                await postSchema.findByIdAndUpdate(parsedImagesData.postId, { $push: { images: updatedImageDoc._id } }).exec();
                responseImages.push(updatedImageDoc);
            } catch (error) {
                console.error('Error saving image:', error);
                return res.status(500).json({ error: "Error saving image." });
            }
        }

        // Update post with mainThumbnail
        const postImages = await postSchema.findById(parsedImagesData.postId)
            .select('images')
            .populate([{ path: 'images', select: { 'filePath': 1 }, model: 'file' },]).exec();

        if (postImages?.images?.[0]?.filePath) {
            await postSchema.findByIdAndUpdate(parsedImagesData.postId, { mainThumbnail: postImages.images[0].filePath }).exec();
        }

        return res.status(200).json({ images: responseImages });
    } catch (error) {
        console.error('Upload Post Images:', error);
        return res.status(500).json({ error: "Internal server error." });
    }
}

export default uploadPostImages;

//-----------my code------------
// import {getCurrentDatePath} from "@repo/shared-server-util";
// import fsExtra from "fs-extra";
// import {fileSchema, postSchema} from "@repo/shared-schemas";
// import {Request, Response} from "express";
//
// const uploadPostImages = async (req:Request<{}, {}, RequestBody>, res:Response) => {
//     try {
//
//         const parsedImagesData = JSON.parse(req.body?.imagesData || '{}')
//         const images = Array.isArray(req.files?.images) ? req.files?.images : [req.files?.images]
//         const directoryPath = `./public/uploads/images/${getCurrentDatePath()}`;
//         await fsExtra.ensureDir(directoryPath);
//         let responseImages = []
//
//         for await (const image of images) {
//             try {
//                 // creating a empty file document
//                 const emptyFileDocument = new fileSchema({
//                     usageType: imagesData.usageType,
//                     filePath: 'temp',
//                     mimeType: image.mimetype,
//                 })
//
//                 const savedEmptyDoc = await emptyFileDocument.save()
//                 const filePath = `/public/uploads/images/${getCurrentDatePath()}/${savedEmptyDoc?._id}.webp`
//                 await image.mv('.' + filePath)
//                 const updatedImageDoc = await fileSchema.findByIdAndUpdate(savedEmptyDoc?._id, {filePath},{new:true}).exec()
//                 await postSchema.findByIdAndUpdate(parsedImagesData.postId, {$push: {images: updatedImageDoc?._id}}).exec()
//                 responseImages = [...responseImages, updatedImageDoc]
//             } catch (error) {
//                 console.log('saving images', error)
//                 res.status(500).json({error})
//                 return
//             }
//         }
//
//         const postImages = await postSchema.findById(parsedImagesData.postId)
//             .select('images')
//             .populate([{ path: 'images', select: { 'filePath': 1 }, model: 'file' },]).exec()
//
//         if (postImages?.images?.[0]?.filePath){
//             await postSchema.findByIdAndUpdate(parsedImagesData.postId,{mainThumbnail: postImages?.images?.[0]?.filePath}).exec()
//         }
//
//         res.status(200).json({images: responseImages})
//
//
//     } catch (error) {
//         console.log('Upload Post Images:', error)
//         res.status(500).json({error})
//         return
//     }
// }
//
// export default uploadPostImages;