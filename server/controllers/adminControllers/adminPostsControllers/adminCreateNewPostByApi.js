const postSchema = require('../../../models/postSchema');
const metaSchema = require('../../../models/metaSchema');
const fsExtra = require('fs-extra');
const updateSaveMetas = require('../_variables/_updateSaveMetas')

const savePostWithDuplicateContent = async newPost =>{

    try {
        const newPostWithMeta = {
            ...newPost,
            tags: newPost.tags ? await updateSaveMetas(newPost.tags) : [],
            categories: newPost.categories ? await updateSaveMetas(newPost.categories) : [],
            actors: newPost.actors ? await updateSaveMetas(newPost.actors) : []
        }

        return postSchema.findOneAndUpdate({title:newPost.title},newPostWithMeta,{new:true,upsert: true}).exec()

    } catch (err) {
        console.log(err)
    }
}


module.exports = async (req, res) => {
    const newPost = req.body.postData

    try {
        if (req.body.duplicateContent) {
            savePostWithDuplicateContent(newPost).then(savedPost => {
                res.json({message: 'post ' + savedPost.title + ' has been saved'})
            }).catch(err => {
                res.json({message: '****error!***** ' + 'post ' + newPost.title + ' Can not be save  in the Database'})
                res.status(500);
            })
        } else {
            postSchema.find(
                {
                    $and: [{title: req.body.postData.title},
                          {videoEmbedCode: req.body.postData.videoEmbedCode},
                    ]
                }).exec().then(async posts => {
                if (posts.length) {
                    res.status(403).send({error: 'title ** ' + newPost.title + ' ** already exist in the Database'})
                } else {
                    if (req.body.downloadImageContent) {
                        let thumbnailUrl = newPost.mainThumbnail
                        const today = new Date(Date.now());
                        const year = today.getFullYear();
                        const month = today.getMonth() + 1;
                        const directoryPath = './static/uploads/image/' + year + '/' + month + '/';
                        const filePathOriginalSize = directoryPath + 'originalSize_' + newPost.title + Date.now() + '.jpg'
                        const filePath = directoryPath + newPost.title + Date.now() + '.jpg'
                        const options = {
                            url: newPost.mainThumbnail,
                            dest: filePathOriginalSize               // will be saved to /path/to/dest/image.jpg
                        }

                        download.image(options)
                            .then(({filename}) => {
                                sharp(filePathOriginalSize).resize(320, 180).toFile(filePath, async (err, info) => {
                                    if (err) {
                                        res.status(500);
                                    } else {
                                        fsExtra.remove(filePathOriginalSize)
                                        const editedNewPost = {
                                            ...newPost,
                                            lastModify: Date.now(),
                                            tags: newPost.tags ? await metasSaver(newPost.tags) : [],
                                            categories: newPost.categories ? await metasSaver(newPost.categories) : [],
                                            actors: newPost.actors ? await metasSaver(newPost.actors) : [],
                                            mainThumbnail: filePath.replace('./static/', '/static/')
                                        }
                                        const newPostDataToSave = new postSchema(editedNewPost);
                                        newPostDataToSave.save().then(savedPostData => {
                                            res.json({message: 'post ' + newPost.title + ' has been saved'})
                                        }).catch(err => {
                                            res.json({message: '****error!***** ' + 'post ' + newPost.title + ' Can not be save  in the Database'})
                                            res.status(500);
                                        })
                                    }
                                })

                            })
                            .catch((err) => console.error(err))


                    } else {

                        const editedNewPost = {
                            ...newPost,
                            lastModify: Date.now(),
                            tags: newPost.tags ? await metasSaver(newPost.tags) : [],
                            categories: newPost.categories ? await metasSaver(newPost.categories) : [],
                            actors: newPost.actors ? await metasSaver(newPost.actors) : []
                        }
                        const newPostDataToSave = new postSchema(editedNewPost);
                        newPostDataToSave.save().then(savedPostData => {
                            res.json({message: 'post ' + newPost.title + ' has been saved'})

                        }).catch(err => {
                            res.status(500).json({message: '****error!***** ' + 'post ' + newPost.title + ' Can not be save  in the Database',err})
                        })
                    }

                }

            })
        }

    } catch (err) {
        console.log(err)
        res.end()
    }


}