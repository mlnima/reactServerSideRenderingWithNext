let apiPostsControllers = {}
const http = require('http')
const Stream = require('stream').Transform
const fs = require('fs');
const sharp = require('sharp');
const fsExtra = require('fs-extra')
const download = require('image-downloader')


const postSchema = require('../../models/postSchema')
const metaSchema = require('../../models/metaSchema');

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
                    console.log(meta.name, ' has error on save meta')
                })
            }

        })
    }
    console.log(finalData)
    return finalData
}

const metaCountSetter = (metas, type) => {
    const typeSyncToPostMeta = type === 'tag' ? 'tags' :
        type === 'category' ? 'categories' :
            type === 'actor' ? 'actors' : ''

    metas.forEach(async meta => {
        // const metaPostCount = await postSchema.count({name:meta})

        // console.log( await postSchema.count({[typeSyncToPostMeta]:new RegExp(meta, 'i')}).exec())
        await metaSchema.findOneAndUpdate({name: meta}, {count: await postSchema.count({[typeSyncToPostMeta]: new RegExp(meta, 'i')})})
    })
}


apiPostsControllers.creatPost = async (req, res) => {
    const newPost = req.body.postData

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
                        {source: req.body.postData.source},
                        {downloadLink: req.body.postData.downloadLink},
                        {description: req.body.postData.description},
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
                                console.log(filename)
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

module.exports = apiPostsControllers