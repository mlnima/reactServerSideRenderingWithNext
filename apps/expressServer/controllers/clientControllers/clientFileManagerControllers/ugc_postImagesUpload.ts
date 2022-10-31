import fsExtra from 'fs-extra'
// import sharp from 'sharp'
// import fs from 'fs'
import postSchema from "../../../../../packages/models/src/postSchema";
import {Worker, isMainThread, parentPort} from 'worker_threads';
import path from "path";

const ugc_postImagesUpload = async (req, res) => {

    try {
        const postId = req.body._id;
        let imageIndex = req.body.imageIndex;
        const directoryPath = './public/uploads/posts/' + postId + '/';
        await fsExtra.ensureDir(directoryPath)
        const images = req.files;
        const imagesKeys = Object.keys(images)
        // let uploadedImagesUrls = []
        // console.log(imageIndex)
        for await (const image of imagesKeys) {

            const tempPath = `./public/uploads/posts/${postId}/temp`
            // const filePath = `./public/uploads/posts/${postId}/${imageIndex}.${'webp'}`

            await images[image].mv(tempPath)

            if (isMainThread) {
                const workerPath = path.join(__dirname, '../../../workers/clientWorkers/clientUploadPostImageWorker/worker.js');
                const worker = new Worker(
                    workerPath,
                    {
                        workerData: {
                            postId,
                            imageIndex,
                        }
                    }
                )

                worker.once('message', async (result) => {
                    await postSchema.findByIdAndUpdate(postId, {$addToSet: {images: {$each: [result]}}}, {new: true})
                        .exec().then(async updated => {
                            res.json({message: 'uploaded', images: updated.images})
                        }).catch(err => {
                            res.json({message: 'Something Went Wrong'})
                        }).finally(() => {
                            worker.postMessage({exit: true})
                        })
                })

                worker.on('error', error => {
                    console.log('error:', error);
                });

                worker.on('exit', exitCode => {
                    console.log('exitCode : ', exitCode);

                })
            } else {

                parentPort.on("message", (commandFromMainThread) => {
                    if (commandFromMainThread.exit) {
                        console.log('terminating thread')
                        process.exit(0);
                    }
                });
            }
            // await sharp(tempPath).webp({lossless: true})
            //     .resize({width: 640, height: 360, fit: sharp.fit.contain})
            //     .toFile(filePath)
            //     .then(async () => {
            //         sharp.cache({files:0})
            //         try {
            //             await fs.chmodSync(tempPath, 777)
            //             await fs.unlinkSync(tempPath)
            //             uploadedImagesUrls = [...uploadedImagesUrls, {
            //                 imageIndex:imageIndex,
            //                 imagePath:filePath.replace('./', '/')
            //             }]
            //
            //
            //
            //         } catch (error) {
            //             console.log("tempPath remove file", error)
            //         }
            //     })
        }

        // await postSchema.findByIdAndUpdate(postId, {$addToSet: {images: {$each: uploadedImagesUrls}}}, {new: true}).exec().then(async updated => {
        //     res.json({message: 'uploaded', images: updated.images})
        // }).catch(err => {
        //     console.log(err)
        //     res.json({message: 'Something Went Wrong'})
        // })

    } catch (error) {
        console.log("ugc_postImagesUpload", error)
        res.end()
    }


}

export default ugc_postImagesUpload;


// try {
//     const postId = req.body._id;
//     let imageIndex = req.body.imageIndex;
//     const directoryPath = './public/uploads/posts/' + postId + '/';
//     await fsExtra.ensureDir(directoryPath)
//     const images = req.files;
//     const imagesKeys = Object.keys(images)
//     let uploadedImagesUrls = []
//     // console.log(imageIndex)
//     for await (const image of imagesKeys) {
//
//         const tempPath = `./public/uploads/posts/${postId}/temp`
//         const filePath = `./public/uploads/posts/${postId}/${imageIndex}.${'webp'}`
//
//         await images[image].mv(tempPath)
//         await sharp(tempPath).webp({lossless: true})
//             .resize({width: 640, height: 360, fit: sharp.fit.contain})
//             .toFile(filePath)
//             .then(async () => {
//                 sharp.cache({files:0})
//                 try {
//                     await fs.chmodSync(tempPath, 777)
//                     await fs.unlinkSync(tempPath)
//                     uploadedImagesUrls = [...uploadedImagesUrls, {
//                         imageIndex:imageIndex,
//                         imagePath:filePath.replace('./', '/')
//                     }]
//
//                 } catch (error) {
//                     console.log("tempPath remove file", error)
//                 }
//             })
//     }
//
//     await postSchema.findByIdAndUpdate(postId, {$addToSet: {images: {$each: uploadedImagesUrls}}}, {new: true}).exec().then(async updated => {
//         res.json({message: 'uploaded', images: updated.images})
//     }).catch(err => {
//         console.log(err)
//         res.json({message: 'Something Went Wrong'})
//     })
//
// } catch (error) {
//     console.log("ugc_postImagesUpload", error)
//     res.end()
// }


//======================
// try {
//
//     const postId = req.body._id;
//     let imageIndex = req.body.imageIndex;
//     const directoryPath = './public/uploads/posts/' + postId + '/';
//     await fsExtra.ensureDir(directoryPath)
//     const images = req.files;
//     const imagesKeys = Object.keys(images)
//     console.log(imageIndex)
//     for await (const image of imagesKeys) {
//         const tempPath = `./public/uploads/posts/${postId}/temp`
//         const filePath = `./public/uploads/posts/${postId}/${imageIndex}.webp`
//
//
//         try {
//             await fs.unlinkSync(tempPath)
//         } catch (error) {
//
//         }
//         await images[image].mv(tempPath)
//         if (isMainThread){
//             const workerPath = path.join(__dirname,'../../../workers/clientWorkers/clientUploadPostImageWorker/worker.js') ;
//             const worker = new Worker(
//                 workerPath,
//                 {
//                     workerData:{
//                         postId,
//                         imageIndex,
//                     }
//                 }
//             )
//
//             worker.once('message',async (result) =>{
//                 worker.postMessage({ exit: true })
//                 //  let uploadedImagesUrls = [result.response]
//                 // uploadedImagesUrls = [...uploadedImagesUrls,result.response]
//                 await postSchema.findByIdAndUpdate(postId, {$addToSet: {images: {$each: [result.response]}}}, {new: true}).exec().then(async updated => {
//                     res.json({message: 'uploaded', images: updated.images})
//                 }).catch(err => {
//                     console.log(err)
//                     res.json({message: 'Something Went Wrong'})
//                 })
//             })
//
//             //  worker.on('message',(result) =>{
//             //     // worker.postMessage({ exit: true })
//             //     console.log('on:',result)
//             //     // uploadedImagesUrls = [...uploadedImagesUrls,result.response]
//             // })
//             worker.on('error', error => {
//                 console.log('error:',error);
//             });
//
//             worker.on('exit', exitCode => {
//                 console.log('exitCode : ',exitCode);
//
//             })
//         }else{
//
//             parentPort.on("message", (commandFromMainThread) => {
//                 if (commandFromMainThread.exit) {
//                     console.log('terminating thread')
//                     process.exit(0);
//                 }
//             });
//         }
//
//     }
//
//
//
// } catch (error) {
//     console.log("ugc_postImagesUpload", error)
//     res.end()
// }