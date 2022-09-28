import fs from 'fs';
import download from 'image-downloader';
import sharp from 'sharp';
import fsExtra from 'fs-extra';
import postSchema from '../../../models/postSchema';
import updateSaveMetas from '../../../_variables/adminVariables/_updateSaveMetas';

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
                return{message: 'Something Went Wrong While Saving! ' + newPost.title}
            }
            return{message: `${createdPost.title} Has Been Saved : ${createdPost._id} `}
        })
    } catch (err) {
        return{message: 'Something Went Wrong! ' + newPost.title}
    }
}

// const savePostIfThereIsNoDuplicate = async (index, downloadImageContent) => {
//
//     try {
//       return await postSchema.find({$or: [{title: index.title}]})
//             .exec()
//             .then(async posts => {
//                 try {
//                     if (posts.length) {
//                         return {message: 'Duplicate Error! ' + index.title + ' Already Exist in the Database'}
//                     } else {
//                         const editedNewPost = {
//                             ...index,
//                             tags: index.tags ? await updateSaveMetas(index.tags) : [],
//                             categories: index.categories ? await updateSaveMetas(index.categories) : [],
//                             actors: index.actors ? await updateSaveMetas(index.actors) : [],
//                             mainThumbnail: downloadImageContent ? await imageDownloader(index) : index.mainThumbnail
//                         }
//
//                         const newPostDataToSave =  new postSchema(editedNewPost);
//
//                         return await newPostDataToSave.save((err, createdPost) => {
//                             if (err) {
//                                return  {message: 'Something Went Wrong While Saving! ' + index.title}
//                             }
//                             console.log('saved')
//                             return {message: `${createdPost.title} Has Been Saved : ${createdPost._id} `}
//                         })
//                     }
//                 } catch (err) {
//                     return {message: 'Something Went Wrong While finding Duplicate In the Database! ' + index.title}
//                 }
//             })
//     } catch (err) {
//         console.log(err, '100')
//     }
//
// }

const savePostIfThereIsNoDuplicate = async (newPost, downloadImageContent) => {

    try {
        const editedNewPost = {
            ...newPost,
            tags: newPost.tags ? await updateSaveMetas(newPost.tags) : [],
            categories: newPost.categories ? await updateSaveMetas(newPost.categories) : [],
            actors: newPost.actors ? await updateSaveMetas(newPost.actors) : [],
            mainThumbnail: downloadImageContent ? await imageDownloader(newPost) : newPost.mainThumbnail
        }

      return await postSchema.findOneAndUpdate({title: newPost.title},editedNewPost,{new:true,upsert:true})
            .exec()
            .then(async createdPost => {
                return {message: `${createdPost.title} Has Been Saved : ${createdPost._id} `}
            }).catch(err=>{
              return {message: `Something Went Wrong While saving`,err}
          })
    } catch (err) {
        console.log(err)
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
        return {message: 'Something Went Wrong While running Saving Functions! ' + newPost.title}
    }
}



const adminCreateNewPostByApi = async (req, res) => {
    const newPost = req.body.postData
    const dontSaveDuplicate = req.body?.dontSaveDuplicate
    const downloadImageContent = req.body?.downloadImageContent

    await createNewPostByApi(newPost, dontSaveDuplicate, downloadImageContent).then(data=>{
        res.json({...data})
    }).catch(err => {
        res.json({message: 'Something Went Wrong While running Creator! '})
    })
}

export default adminCreateNewPostByApi


