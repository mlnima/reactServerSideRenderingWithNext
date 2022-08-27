import postSchema from '../../../models/postSchema';
import fsExtra from 'fs-extra';
import sharp from 'sharp';
import fs from 'fs';

const clientUserCreateNewPost = async (req, res) => {
    const postData = JSON.parse(req.body.postData);

    const onErrorHandler = (error) => {
        res.json({response: 'something is wrong', type: 'error', error: error})
    }

    try {

        const images = req.files
        const postId = req.body?.postId
        const directoryPath = './public/uploads/posts/' + postId + '/'
        // const post = await postSchema.findById(postId).exec()

        // if (!post) {
        //     onErrorHandler('post not found')
        // }

        await fsExtra.ensureDir(directoryPath)

        let uploadedImages = []

        for await (const image of Object.keys(images)) {
            const filePath = `./public/uploads/posts/${postId}/${image}`
            const tempPath = `./public/uploads/posts/${postId}/temp-${image}`

            await images[image].mv(tempPath)
            await sharp(tempPath).resize(640, 360).toFile(filePath)

            try {
                fs.unlinkSync(tempPath)
            } catch (error) {
                console.error(error)
            }

            uploadedImages = [...uploadedImages, process.env.NEXT_PUBLIC_PRODUCTION_URL + filePath.replace('.', '')]
        }


        const update = {
            ...postData,
            images: [
                ...postData.images ,
                ...uploadedImages
            ]
        }


        // await postSchema.findByIdAndUpdate(postId, update).exec().then(_=>{
        //     res.json({response: 'Uploaded',images:uploadedImages})
        // })



        postSchema.findByIdAndUpdate(postData._id, update, {new: true}).exec().then(updatedPost => {
            res.json({
                message: 'post successfully updated after a moderator review changes will be published',
                post: updatedPost
            });
        }).catch(error => {
            if (error.code === 11000) {
                res.status(400).json({
                    message: 'Post with this title already exist in the Database', type: 'error'
                })
            } else {
                res.status(500).json({
                    message: 'Something Went Wrong', type: 'error'
                })
            }
        })


        // res.end()



        // } catch (err) {
        //     // console.log(err)
        //     // res.status(500).json({message: 'Something Went Wrong',type:'error'})
        //     onErrorHandler(error)
        // }

        // } catch (error) {
        //     onErrorHandler(error)
        // }

    } catch (error) {
        // console.log(err)
        // res.status(500).json({message: 'Something Went Wrong', type: 'error'})
        onErrorHandler(error)
    }

}

export default clientUserCreateNewPost;


// try {
//     postSchema.findByIdAndUpdate(postData._id,postData,{new:true}).exec().then(updatedPost=>{
//         res.json({
//             message:'post successfully updated after a moderator review changes will be published',
//             post:updatedPost
//         });
//     }).catch(err=>{
//         if (err.code === 11000) {
//             res.status(400).json({
//                 message: 'Post with this title already exist in the Database',type:'error'
//             })
//         } else {
//             res.status(500).json({
//                 message: 'Something Went Wrong',type:'error'
//             })
//         }
//     })
//
// } catch (err) {
//     console.log(err)
//     res.status(500).json({message: 'Something Went Wrong',type:'error'})
// }