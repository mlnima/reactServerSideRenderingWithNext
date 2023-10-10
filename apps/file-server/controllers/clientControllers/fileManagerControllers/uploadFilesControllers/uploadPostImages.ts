import {getCurrentDatePath} from "custom-server-util";
import fsExtra from "fs-extra";
import {fileSchema, postSchema} from "models";

const uploadPostImages = async (req, res) => {
    try {

        const imagesData = JSON.parse(req.body?.imagesData || '{}')
        const images = Array.isArray(req.files?.images) ? req.files?.images : [req.files?.images]
        const directoryPath = `./public/uploads/images/${getCurrentDatePath()}`;
        await fsExtra.ensureDir(directoryPath);
        let responseImages = []

        for await (const image of images) {
            try {
                // creating a empty file document
                const emptyFileDocument = new fileSchema({
                    usageType: imagesData.usageType,
                    filePath: 'temp',
                    mimeType: image.mimetype,
                })

                const savedEmptyDoc = await emptyFileDocument.save()
                const filePath = `/public/uploads/images/${getCurrentDatePath()}/${savedEmptyDoc?._id}.webp`
                await image.mv('.' + filePath)
                const updatedImageDoc = await fileSchema.findByIdAndUpdate(savedEmptyDoc?._id, {filePath},{new:true}).exec()
                await postSchema.findByIdAndUpdate(imagesData.postId, {$push: {images: updatedImageDoc?._id}}).exec()
                responseImages = [...responseImages, updatedImageDoc]
            } catch (error) {
                console.log('saving images', error)
                res.status(500).json({error})
                return
            }
        }

        const postImages = await postSchema.findById(imagesData.postId)
            .select('images')
            .populate([{ path: 'images', select: { 'filePath': 1 }, model: 'file' },]).exec()

        if (postImages?.images?.[0]?.filePath){
            await postSchema.findByIdAndUpdate(imagesData.postId,{mainThumbnail: postImages?.images?.[0]?.filePath}).exec()
        }

        res.status(200).json({images: responseImages})

    } catch (error) {
        console.log('Upload Post Images:', error)
        res.status(500).json({error})
        return
    }
}

export default uploadPostImages;