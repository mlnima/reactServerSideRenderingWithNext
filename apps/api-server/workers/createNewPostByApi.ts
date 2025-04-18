import dotenv from 'dotenv';
import {connectToDatabase} from "@repo/db";

dotenv.config();
connectToDatabase('Worker').finally();
import postSchema from "@schemas/postSchema";
import {Worker, parentPort, workerData} from 'worker_threads'

import sharp from 'sharp';

// Importing the updateSaveMetas module
import updateSaveMetas from '@util/_updateSaveMetas';

// Importing the image-downloader library
import * as download from 'image-downloader';

// Importing fs-extra and fs libraries
import fsExtra from 'fs-extra';
import fs from 'fs';
// const {fileDownloader} = require('@repo/shared-server-util');

const imageDownloader = async (newPost) => {

    const formats = ['.jpeg', '.jpg', '.jfif', '.pjpeg', '.pjp', '.png', '.svg', '.webp']
    const imageformat = formats.find(format => newPost?.mainThumbnail?.includes(format))
    const today = new Date(Date.now());
    const directoryPath = `./public/uploads/image/${today.getFullYear()}/${today.getMonth() + 1}/`;
    !fs.existsSync(directoryPath) ?  fs.mkdirSync(directoryPath, { recursive: true }):null;
    const fileName =`${newPost.title.replace(/[^a-zA-Z ]/g, "")}${Date.now()}`;
    const filePathOriginalSize = `${directoryPath}originalSize_${fileName + imageformat}`;
    const filePath = `${directoryPath}${fileName + imageformat}`;
    const options = {
        url: newPost.mainThumbnail,
        dest: filePathOriginalSize
    }

    try {
        return await download.image(options)
            .then(async ({filename}) => {
                try {
                    return await sharp(filePathOriginalSize).resize(320, 180).toFile(filePath).then(async ()=>{
                        try {
                            await fsExtra.remove(filePathOriginalSize)
                            return filePath.replace('./public/', '/public/')
                        }catch (err) {
                            console.log(err)
                            return newPost.mainThumbnail
                        }

                    }).catch((err)=>{
                        console.log(err)
                        return newPost.mainThumbnail
                    })
                }catch (err) {
                    console.log(err)
                    return newPost.mainThumbnail
                }

            })
            .catch((err) => {
                console.log(err)
                return newPost.mainThumbnail
            })
    } catch (err) {
        console.log(err)
        return newPost.mainThumbnail
    }
}


const savePostWithDuplicateContent = async (newPost, downloadImageContent) => {

    try {
        const newPostWithMeta = {
            ...newPost,
            tags: newPost.tags ? await updateSaveMetas(newPost.tags) : [],
            categories: newPost.categories ? await updateSaveMetas(newPost.categories) : [],
            actors: newPost.actors ? await updateSaveMetas(newPost.actors) : [],
            mainThumbnail: downloadImageContent ? await imageDownloader(newPost) : newPost.mainThumbnail
        };
        const newPostDataToSave = new postSchema(newPostWithMeta)
        await newPostDataToSave.save((err, createdPost) => {
            if (err) {
                parentPort.postMessage({message: 'Something Went Wrong While Saving! ' + newPost.title})
            }
            parentPort.postMessage({message: `${createdPost.title} Has Been Saved : ${createdPost._id} `})
        })
    } catch (err) {
        parentPort.postMessage({message: 'Something Went Wrong! ' + newPost.title})
    }
}


const savePostIfThereIsNoDuplicate = async (newPost, downloadImageContent) => {

    try {
        await postSchema.find({$or: [{title: newPost.title}]})
            .exec()
            .then(async posts => {
                try {
                    if (posts?.length) {
                        parentPort.postMessage({message: 'Duplicate Error! ' + newPost.title + ' Already Exist in the Database'})
                    } else {
                        const editedNewPost = {
                            ...newPost,
                            lastModify: Date.now(),
                            tags: newPost.tags ? await updateSaveMetas(newPost.tags) : [],
                            categories: newPost.categories ? await updateSaveMetas(newPost.categories) : [],
                            actors: newPost.actors ? await updateSaveMetas(newPost.actors) : [],
                            mainThumbnail: downloadImageContent ? await imageDownloader(newPost) : newPost.mainThumbnail
                        }

                        const newPostDataToSave = await new postSchema(editedNewPost);

                        await newPostDataToSave.save((err, createdPost) => {
                            if (err) {
                                parentPort.postMessage({message: 'Something Went Wrong While Saving! ' + newPost.title})
                            }
                            parentPort.postMessage({message: `${createdPost.title} Has Been Saved : ${createdPost._id} `})
                        })
                    }
                } catch (err) {
                    console.log(err, '94')
                    return {message: 'Something Went Wrong While finding Duplicate In the Database! ' + newPost.title}
                }
            })
    } catch (err) {
        console.log(err, '100')
    }

}


const createNewPostByApi = async (newPost, dontSaveDuplicate, downloadImageContent) => {
    try {
        if (dontSaveDuplicate) {
            return await savePostIfThereIsNoDuplicate(newPost, downloadImageContent)

        } else {
            return await savePostWithDuplicateContent(newPost, downloadImageContent)
        }
    } catch (err) {
        parentPort.postMessage({message: 'Something Went Wrong While running Saving Functions! ' + newPost.title})
    }
}

const createMultiplePostsByAPI = async (newPost,dontSaveDuplicate, downloadImageContent)=>{
  for await (const post of newPost){
      await createNewPostByApi(post, dontSaveDuplicate, downloadImageContent)
  }
}

if (Array.isArray(workerData?.newPost)){
    createMultiplePostsByAPI(workerData?.newPost, workerData?.dontSaveDuplicate, workerData?.downloadImageContent).catch(err => {
        parentPort.postMessage({message: 'Something Went Wrong While running Creator! '})
    })
}else {
    createNewPostByApi(workerData?.newPost, workerData?.dontSaveDuplicate, workerData?.downloadImageContent).catch(err => {
        parentPort.postMessage({message: 'Something Went Wrong While running Creator! '})
    })
}





// parentPort.on("message", (commandFromMainThread) => {
//     if (commandFromMainThread.exit) {
//         process.exit(0);
//     }
// });


// if (req.body.downloadImageContent) {
// let thumbnailUrl = index.mainThumbnail
// const today = new Date(Date.now());
// const year = today.getFullYear();
// const month = today.getMonth() + 1;
// const directoryPath = './static/uploads/image/' + year + '/' + month + '/';
// const filePathOriginalSize = directoryPath + 'originalSize_' + index.title + Date.now() + '.jpg'
// const filePath = directoryPath + index.title + Date.now() + '.jpg'
// const options = {
//     url: index.mainThumbnail,
//     dest: filePathOriginalSize               // will be saved to /path/to/dest/image.jpg
// }
//
// download.image(options)
//     .then(({filename}) => {
//         sharp(filePathOriginalSize).resize(320, 180).toFile(filePath, async (err, info) => {
//             if (err) {
//                 res.status(500);
//             } else {
//                 fsExtra.remove(filePathOriginalSize)
//                 const editedNewPost = {
//                     ...index,
//                     lastModify: Date.now(),
//                     tags: index.tags ? await metasSaver(index.tags) : [],
//                     categories: index.categories ? await metasSaver(index.categories) : [],
//                     actors: index.actors ? await metasSaver(index.actors) : [],
//                     mainThumbnail: filePath.replace('./static/', '/static/')
//                 }
//                 const newPostDataToSave = new PostSchema(editedNewPost);
//                 newPostDataToSave.save().then(savedPostData => {
//                     res.json({message: 'post ' + index.title + ' has been saved'})
//                 }).catch(err => {
//                     res.json({message: '****error!***** ' + 'post ' + index.title + ' Can not be save  in the Database'})
//                     res.status(500);
//                 })
//             }
//         })
//
//     })
//     .catch((err) => console.error(err))