import {FileSchema, UserSchema} from 'shared-schemas'
import fsExtra from "fs-extra";
import {getCurrentDatePath} from "custom-server-util";
import sharp from 'sharp'
import {removeFileExtension} from "custom-util";
import fs from "fs";
import fileRemover from "../../../../../_variables/fileRemover";
import {Request,Response} from "express";

// interface RequestBody {
//     imagesData?: string;
// }

const profileImageTypeHandler = async (userId:string, profileImageId:string) => {
    try {
        const user = await UserSchema.findById(userId).exec();
        await UserSchema.findByIdAndUpdate(userId, {$set: {profileImage: profileImageId}}).exec();
        await fileRemover(user?.profileImage);
    } catch (error) {
        console.log(error)
    }
}

const uploadImage = async (req:Request<{}, {}, RequestBody>, res:Response) => {
    try {

        const imagesData = JSON.parse(req.body.imagesData || '{}')
        const images = Array.isArray(req.files?.images) ? req.files?.images : [req.files?.images]
        const directoryPath = `./public/uploads/images/${getCurrentDatePath()}`;
        await fsExtra.ensureDir(directoryPath);
        let responseImages = []

        const imagePromises = images.map(async (image:any) => {
            const fileName = await removeFileExtension(image.name)
            const tempPath = `${directoryPath}/temp-${fileName}`;
            const targetPath = `${directoryPath}/${fileName}.webp`

            await image.mv(tempPath)
            sharp.cache({files: 0})

            const imageDataToSave = new FileSchema({
                usageType: imagesData.usageType,
                filePath: `/public/uploads/images/${getCurrentDatePath()}/${fileName}.webp`,
                mimeType: image.mimetype,
            })


            // const fitImage = imagesData.usageType === 'post' ? sharp.fit.contain :
            //     imagesData.usageType === 'profileImage' ? sharp.fit.cover : sharp.fit.cover
            //

            return sharp(tempPath).webp({nearLossless: true, quality: 50})
                //@ts-ignore
                .resize({
                    width: imagesData?.width || 640,
                    height: imagesData?.height || 480,
                    fit: imagesData.usageType === 'post' ? sharp.fit.contain : sharp.fit.cover})
                .toFile(targetPath)
                .then(async () => {
                    if (fs.existsSync(tempPath)) {
                        try {
                           fs.unlinkSync(tempPath)
                        } catch (_) {
                        }
                    }

                    await imageDataToSave.save()
                    responseImages = [...responseImages, imageDataToSave]
                })
        })

        await Promise.all(imagePromises)

        if (imagesData.usageType === 'profileImage' && req.userData?._id && responseImages?.[0]?._id) {
            await profileImageTypeHandler(req.userData._id, responseImages?.[0]?._id)
        }

        res.status(200).json({images: responseImages})
    } catch (error) {
        console.log('upload image error:', error)
        res.status(500).json({error})
    }
}


export default uploadImage