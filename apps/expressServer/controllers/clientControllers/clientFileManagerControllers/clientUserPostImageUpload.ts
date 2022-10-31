import sharp from 'sharp'
import fsExtra from 'fs-extra'
import fs from 'fs'
import postSchema from '../../../../../packages/models/src/postSchema'

const clientUserPostImageUpload = async (req, res) => {
    const onErrorHandler = (error) => {
        res.json({response: 'something is wrong', type: 'error', error: error})
    }
    try {
        const images = req.files
        const postId = req.body?.postId
        const directoryPath = './public/uploads/posts/' + postId + '/'
        const post = await postSchema.findById(postId).exec()

        if (!post) {
            onErrorHandler('post not found')
        }

        await fsExtra.ensureDir(directoryPath)

        let uploadedImages=[]

        for await (const image of Object.keys(images)) {
            const filePath = `./public/uploads/posts/${postId}/${image}`
            const tempPath = `./public/uploads/posts/${postId}/temp-${image}`

            await images[image].mv(tempPath)
            await sharp(tempPath).resize(640, 480).toFile(filePath)

            try {
                fs.unlinkSync(tempPath)
            } catch (err) {
                console.error(err)
            }

            uploadedImages=[...uploadedImages,process.env.NEXT_PUBLIC_PRODUCTION_URL + filePath.replace('.', '')]
        }

        const update = {
            $push: {images: uploadedImages}
        }

        await postSchema.findByIdAndUpdate(postId, update).exec().then(_=>{
            res.json({response: 'Uploaded',images:uploadedImages})
        })

    } catch (error) {
        onErrorHandler(error)
    }

}

export default clientUserPostImageUpload