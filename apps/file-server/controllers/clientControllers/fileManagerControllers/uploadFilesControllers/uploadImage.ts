import {fileSchema} from 'models'
import fsExtra from "fs-extra";
import getCurrentDatePath from "custom-server-util/src/path-utils/getCurrentDatePath";
import sharp from 'sharp'
import removeFileExtension from "custom-util/src/file-utils/removeFileExtension";
import fs from "fs";

const uploadImage = async (req, res) => {
    try {
        const imagesData = JSON.parse(req.body?.imagesData || '{}')
        const images = Array.isArray(req.files?.images) ? req.files?.images : [req.files?.images]
        const directoryPath = `./public/uploads/images/${getCurrentDatePath()}`;
        await fsExtra.ensureDir(directoryPath);
        let responseImages = []

        const imagePromises = images.map(async (image) => {
            const fileName = await removeFileExtension(image.name)
            const tempPath = `${directoryPath}/temp-${fileName}`;
            const targetPath = `${directoryPath}/${fileName}.webp`

            await image.mv(tempPath)
            sharp.cache({files: 0})

            const imageDataToSave = new fileSchema({
                usageType: imagesData.usageType,
                filePath: `/public/uploads/images/${getCurrentDatePath()}/${fileName}.webp`,
                mimeType: image.mimetype,
            })

            return sharp(tempPath).webp({nearLossless: true, quality: 50})
                .resize({width: imagesData?.width || 640, height: imagesData?.height || 480, fit: sharp.fit.contain})
                .toFile(targetPath)
                .then(async () => {
                    if (fs.existsSync(tempPath)) {
                        try {
                            await fs.unlinkSync(tempPath)
                        } catch (_) {}
                    }

                    await imageDataToSave.save()
                    responseImages = [...responseImages, imageDataToSave]
                })
        })

        await Promise.all(imagePromises)

        res.status(200).json({images: responseImages})
    } catch (error) {
        console.log('upload image error:', error)
        res.status(500).json({error})
    }
}



export default uploadImage