const postSchema = require('../../../models/postSchema');
const metaSchema = require('../../../models/metaSchema');
const fsExtra = require('fs-extra');

const metasSaver = async (metas) => {
    let finalData = []
    for await (let meta of metas) {
        await metaSchema.findOne({name: meta.name}).exec().then(async existingMeta => {
            if (existingMeta) {
                finalData = [...finalData, existingMeta._id]
            } else {
                const metaDataToSave = new metaSchema({
                    name: meta.name,
                    type: meta.type,
                    count: 1
                })
                await metaDataToSave.save().then(saved => {
                    finalData = [...finalData, saved._id]
                }).catch(err => {

                })
            }
        })
    }
    return finalData
}


module.exports = async (req, res) => {
    const newPost = req.body.postData
    console.log(newPost)
    try {

        if (req.body.duplicateContent) {
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
                res.end()
            }).catch(err => {
                res.json({message: '****error!***** ' + 'post ' + newPost.title + ' Can not be save  in the Database'})
                res.sendStatus(500);
                res.end()
            })
        } else {
            postSchema.find(
                {
                    $or: [{title: req.body.postData.title},
                        {videoEmbedCode: req.body.postData.videoEmbedCode},
                    ]
                }).exec().then(async posts => {
                if (posts.length > 0) {
                    res.status(403).send({error: 'title ** ' + newPost.title + ' ** already exist in the Database'})
                    // res.json({ savedPostData });
                    res.end()
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
                                // console.log(filename)
                                // const filePath = directoryPath + newPost.title + '_' + filename;
                                // const filePathOriginalSize = directoryPath + filename;
                                // console.log('Saved to', filename)
                                sharp(filePathOriginalSize).resize(320, 180).toFile(filePath, async (err, info) => {
                                    if (err) {
                                        console.log('sharp Error', err)
                                        res.sendStatus(500);
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
                                            res.end()
                                        }).catch(err => {
                                            res.json({message: '****error!***** ' + 'post ' + newPost.title + ' Can not be save  in the Database'})
                                            res.sendStatus(500);
                                            res.end()
                                        })
                                    }
                                })

                            })
                            .catch((err) => console.error(err))


                    } else {
                        console.log('no duplicated find')
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
                            res.end()
                        }).catch(err => {
                            res.json({message: '****error!***** ' + 'post ' + newPost.title + ' Can not be save  in the Database'})
                            res.sendStatus(500);
                            res.end()
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