const fs = require("fs");
const download = require("image-downloader");
const sharp = require("sharp");
const fsExtra = require("fs-extra");
const postSchema = require("../../../models/postSchema");
const updateSaveMetas = require("../_variables/_updateSaveMetas");

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
                return{message: 'Something Went Wrong While Saving! ' + newPost.title}
            }
            return{message: `${createdPost.title} Has Been Saved : ${createdPost._id} `}
        })
    } catch (err) {
        return{message: 'Something Went Wrong! ' + newPost.title}
    }
}

const savePostIfThereIsNoDuplicate = async (newPost, downloadImageContent) => {

    try {
      return   await postSchema.find({$or: [{title: newPost.title}]})
            .exec()
            .then(async posts => {
                try {
                    if (posts.length) {
                        return {message: 'Duplicate Error! ' + newPost.title + ' Already Exist in the Database'}
                    } else {
                        const editedNewPost = {
                            ...newPost,
                            tags: newPost.tags ? await updateSaveMetas(newPost.tags) : [],
                            categories: newPost.categories ? await updateSaveMetas(newPost.categories) : [],
                            actors: newPost.actors ? await updateSaveMetas(newPost.actors) : [],
                            mainThumbnail: downloadImageContent ? await imageDownloader(newPost) : newPost.mainThumbnail
                        }

                        const newPostDataToSave =  new postSchema(editedNewPost);

                        return await newPostDataToSave.save((err, createdPost) => {
                            if (err) {
                               return  {message: 'Something Went Wrong While Saving! ' + newPost.title}
                            }
                            console.log('saved')
                            return {message: `${createdPost.title} Has Been Saved : ${createdPost._id} `}
                        })
                    }
                } catch (err) {
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
        return {message: 'Something Went Wrong While running Saving Functions! ' + newPost.title}
    }
}

module.exports = async (req, res) => {
    const newPost = req.body.postData
    const dontSaveDuplicate = req.body?.dontSaveDuplicate
    const downloadImageContent = req.body?.downloadImageContent

    await createNewPostByApi(newPost, dontSaveDuplicate, downloadImageContent).then(data=>{
        res.json({...data})
    }).catch(err => {
        res.json({message: 'Something Went Wrong While running Creator! '})
    })
}

