const dataEncoder = require('../tools/dataEncoder')
let postsControllers = {};
const postSchema = require('../models/postSchema');
const userSchema = require('../models/userSchema');
const metaSchema = require('../models/metaSchema');
const commentSchema = require('../models/commentSchema');
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

function fieldGenerator(fields) {
    // if (fields[0] === 'all')
    let exportData = '';
    for (let filed of fields) {
        exportData += ` ${filed} , `
    }
    return exportData
};

postsControllers.createNewPost = async (req, res) => {
    const newPost = req.body.postData;

    try {
        const editedNewPost = {
            ...newPost,
            lastModify: Date.now(),
            tags: newPost.tags ? await metasSaver(newPost.tags) : [],
            categories: newPost.categories ? await metasSaver(newPost.categories) : [],
            actors: newPost.actors ? await metasSaver(newPost.actors) : []
        }
        const newPostDataToSave = new postSchema(editedNewPost);
        newPostDataToSave.save().then(savedPostData => {
            res.json({savedPostData});
            console.log('savedPostData : ', savedPostData)
            res.end()
        }).catch(err => {
            if (err.code === 11000) {
                res.status(500).send({error: 'Post with this Title already exist in the Database'})
                // res.json({ savedPostData });
                res.end()
            } else {
                res.sendStatus(500);
                res.end()
            }
        })

    } catch (err) {
        console.log(err)
        res.end()
    }
};


postsControllers.updateMeta = (req, res) => {
    metaSchema.findByIdAndUpdate(req.body.data._id, {...req.body.data}, {new: true}).exec().then(updatedMeta => {
        res.json({updated: updatedMeta})
        res.end()
    }).catch(err => {
        console.log(err)
    })
}


postsControllers.updatePost = async (req, res) => {
    const postUpdatedData = req.body.postData

    console.log(postUpdatedData)
    try {
        const finalPostUpdatedData = {
            ...postUpdatedData,
            lastModify: Date.now(),
            tags: postUpdatedData.tags ? await metasSaver(postUpdatedData.tags) : [],
            categories: postUpdatedData.categories ? await metasSaver(postUpdatedData.categories) : [],
            actors: postUpdatedData.actors ? await metasSaver(postUpdatedData.actors) : []
        }

        await postSchema.findByIdAndUpdate(postUpdatedData._id, {...finalPostUpdatedData}, {new: true}).exec().then(updated => {
            res.end()
        }).catch(err => {
            console.log(err)
            res.sendStatus(500);
            res.end()
        })
        res.end()
    } catch (err) {
        console.log(err)
        res.end()
    }
};

postsControllers.getPostsInfo = async (req, res) => {

    const size = parseInt(req.body.size) > 500 ? 500 : parseInt(req.body.size)
    const pageNo = req.body.pageNo || 1;
    let postTypeQuery = req.body.postType === 'all' ? {} : {postType: req.body.postType};
    let statusQuery = req.body.status === 'all' ? {status: {$ne: 'trash'}} : {status: req.body.status};
    let authorQuery = req.body.author === 'all' ? {} : {author: req.body.author};
    let metaQuery = req.body.content === 'all' ? {} : {
        $or: [
            {categories: req.body.content},
            {tags: req.body.content},
            {actors: req.body.content}
        ]
    };
    let searchQueryGenerator = () => {
        if (req.body.keyword === '') {
            return {}
        } else {
            if (!req.body.lang || req.body.lang === 'default') {
                return {$or: [{title: new RegExp(req.body.keyword, 'i')}, {description: new RegExp(req.body.keyword, 'i')}]};
            } else {
                return {
                    $or: [
                        {title: new RegExp(req.body.keyword, 'i')},
                        {description: new RegExp(req.body.keyword, 'i')},
                        {[`translations.${req.body.lang}.title`]: new RegExp(req.body.keyword, 'i')},
                        {[`translations.${req.body.lang}.description`]: new RegExp(req.body.keyword, 'i')},]
                }
            }
        }
    }

    let selectedFields = req.body.fields[0] === 'all' ? {} : fieldGenerator(req.body.fields);
    let sortQuery = req.body.sort === 'latest' ? '-_id' : {[req.body.sort]: -1}

    let posts = await postSchema.find({$and: [postTypeQuery, statusQuery, authorQuery, searchQueryGenerator(), metaQuery]}).select(selectedFields).skip(size * (pageNo - 1)).limit(size).sort(sortQuery).exec();
    let postsCount = await postSchema.count({$and: [postTypeQuery, statusQuery, authorQuery, searchQueryGenerator(), metaQuery]}).exec()

    Promise.all([posts, postsCount]).then(async data => {
        const posts = data[0]
        let postsDataToSend = []
        try {
            for await (let post of posts) {
                let dataSetPost = {
                    ...post.toObject(),
                    // author: post.author ? await userSchema.findById(post.author).exec() : {username: 'Private'},
                    // categories: post.categories ? await metaSchema.find({'_id': {$in: [...post.categories]}}) : [],
                    // tags: post.tags ? await metaSchema.find({'_id': {$in: [...post.tags]}}) : [],
                    // actors: post.actors ? await metaSchema.find({'_id': {$in: [...post.actors]}}) : []
                }
                postsDataToSend = [...postsDataToSend, dataSetPost]
            }
            res.json({posts: postsDataToSend, error: false, totalCount: data[1]})
            res.end()
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                message: 'Server Error'
            })
        }
    }).catch(err => {
        return res.status(500).json({
            message: 'Server Error'
        })

    })

};

postsControllers.getPostInfo = (req, res) => {
    const _id = req.body._id;
    postSchema.findById(_id).exec().then(async post => {
        const postData = {
            ...post.toObject(),
            categories: post.categories ? await metaSchema.find({'_id': {$in: [...post.categories]}}) : [],
            tags: post.tags ? await metaSchema.find({'_id': {$in: [...post.tags]}}) : [],
            actors: post.actors ? await metaSchema.find({'_id': {$in: [...post.actors]}}) : []
        }
        const postMessageToSend = {post: postData, error: false}
        res.json(postMessageToSend);
        res.end()
    })
};


postsControllers.deletePost = (req, res) => {
    const _id = req.body._id;
    postSchema.findByIdAndDelete(_id).then(() => {
        res.json({message: `${_id} Deleted Permanently`, error: false});
        res.end()
    }).catch(() => {
        res.json({message: `Can Not Delete ${_id} Something Went Wrong`, error: true});
        res.end()
    })
};

postsControllers.postsBulkAction = async (req, res) => {
    const ids = req.body.ids || [];
    console.log(req.body)
    const status = req.body.status;
    let actions;

    if (status === 'delete') {
        actions = ids.map(async id => {
            return postSchema.findByIdAndDelete(id)
        })
    } else {
        actions = ids.map(async id => {
            return postSchema.findByIdAndUpdate(id, {$set: {status}})
        })
    }

    Promise.all(actions).then(() => {
        return res.status(200).json({
            message: 'all done'
        });
    }).catch(err => {
        return res.status(500).json({
            message: 'Server Error'
        });
    })
};


postsControllers.bulkAction = async (req, res) => {
    const type = req.body.type
    const status = req.body.status
    const ids = req.body.ids
    let actionsPromise;

    const targetSchema = type === 'posts' ? postSchema :
        type === 'metas' ? metaSchema :
            type === 'comments' ? commentSchema :
                type === 'users' ? userSchema : null
    if (status === 'delete') {
        actionsPromise = ids.map(id => {
            return targetSchema.findByIdAndDelete(id)
        })
    } else {
        actionsPromise = ids.map(id => {
            return targetSchema.findByIdAndUpdate(id, {$set: {status}})
        })
    }
    Promise.all(actionsPromise).then(() => {
        return res.status(200).json({
            message: 'all done'
        });
    }).catch(err => {
        return res.status(500).json({
            message: 'Server Error'
        });
    })

}


postsControllers.likeDislikeView = (req, res) => {
    postSchema.findByIdAndUpdate(req.body.id, {$inc: {[req.body.type]: 1}}, {new: true}).exec();
    res.end()
};

postsControllers.getSingleMeta = async (req, res) => {
    metaSchema.findById(req.body.id).exec().then(meta => {
        res.json({meta})
        res.end()
    }).catch(err => {
        console.log(err)
        res.error(500)
        res.end()
    })
}


postsControllers.getMeta = async (req, res) => {
    const type = req.body.type ? {type: req.body.type} : {}
    const size = parseInt(req.body.size) > 500 ? 500 : parseInt(req.body.size)
    let statusQuery = req.body.status === 'all' ? {status: {$ne: 'trash'}} : {status: req.body.status};

    const page = req.body.page;
    // console.log(req.body)
    const startWithQuery = req.body.startWith === 'any' ? {} : {name: {$regex: '^' + req.body.startWith, $options: 'i'}}
    let searchQuery = req.body.keyword === '' ? {} : {
        $or: [
            {name: new RegExp(req.body.keyword, 'i')},
            {description: new RegExp(req.body.keyword, 'i')}]
    };

    let searchQueryGenerator = () => {
        if (req.body.keyword === '') {
            return {}
        } else {
            const keywordToSearch = req.body.keyword
            // console.log(req.body.keyword,keywordToSearch)
            if (!req.body.lang || req.body.lang === 'default') {
                return {$or: [{name: new RegExp(req.body.keyword, 'i')}, {description: new RegExp(req.body.keyword, 'i')}]};
            } else {
                return {
                    $or: [
                        {name: new RegExp(keywordToSearch, 'i')},
                        {description: new RegExp(keywordToSearch, 'i')},
                        {[`translations.${req.body.lang}.name`]: new RegExp(keywordToSearch, 'i')},
                        {[`translations.${req.body.lang}.description`]: new RegExp(keywordToSearch, 'i')},]
                }
            }
        }
    }


    let sortQuery = !req.body.sort || req.body.sort === 'latest' ? '-id' : req.body.sort && typeof req.body.sort === 'string' ? req.body.sort : {[req.body.sort]: -1}
    const metaCount = await metaSchema.countDocuments({$and: [type, searchQueryGenerator(), startWithQuery, statusQuery]}).exec()
    metaSchema.find({$and: [type, searchQueryGenerator(), startWithQuery, statusQuery]}).limit(size).skip(size * (page - 1)).sort(sortQuery).exec().then(async metas => {

        const mapMetaToGetImage = metas.map(async meta => {
            try {
                const noImageUrl = await postSchema.find({[type.type]: meta._id}).limit(1).sort('-_id').exec().then(lastPost => {
                    if (lastPost[0]) {
                        return lastPost[0].mainThumbnail
                    } else {
                        return undefined
                    }
                }).catch(err => {
                    console.log(err)
                    res.end()
                })
                return {
                    ...meta.toObject(),
                    count: await postSchema.countDocuments({[type.type]: meta._id}).exec(),
                    noImageUrl

                }
            } catch (e) {
                console.log('error 2')
            }
        })

        res.json({metas: await Promise.all(mapMetaToGetImage), totalCount: metaCount})
        res.end()


    }).catch(err => {
        // console.log( err)
        res.end()
    })

}

postsControllers.deleteMeta = (req, res) => {
    const _id = req.body._id
    // console.log(_id)
    metaSchema.findByIdAndDelete(_id).exec().then(() => {
        res.json({message: 'deleted'})
        res.end()
    }).catch(err => {
        res.error(500)
        res.end()
    })
}

postsControllers.newComment = (req, res) => {

    const commentDataToSave = new commentSchema(req.body)
    commentDataToSave.save(saved => {
        console.log(saved)
        res.end()
    })
};

postsControllers.getComments = (req, res) => {
    const size = parseInt(req.body.size) > 50 ? 50 : parseInt(req.body.size)
    const pageNo = req.body.pageNo ? parseInt(req.body.pageNo) : 1
    const onDocument = req.body.onDocument ? {onDocumentId: req.body.onDocument} : {}
    const status = !req.body.status || req.body.status === 'all' ? {status: 'approved'} : {status: req.body.status}
    let sortQuery = req.body.sort === 'latest' ? '-_id' : {[req.body.sort]: -1}
    const searchQuery = !req.body.keyword ? {} : {
        $or: [
            {author: new RegExp(req.body.keyword, 'i')},
            {body: new RegExp(req.body.keyword, 'i')},
            {email: new RegExp(req.body.keyword, 'i')},
        ]
    };

    const comments = commentSchema.find({$and: [onDocument, status, searchQuery]}).skip(size * (pageNo - 1)).limit(size).sort(sortQuery).exec()
    const commentsCount = commentSchema.countDocuments({$and: [onDocument, status, searchQuery]}).exec()

    Promise.all([comments, commentsCount]).then(data => {
        res.json({comments: data[0], count: data[1]})
        res.end()
    }).catch(err => {
        console.log(err)
    })

};

postsControllers.updateComment = (req, res) => {
    commentSchema.findByIdAndUpdate(req.body._id, req.body.update, {new: true}).exec().then(updated => {
        res.end()
    })
};

postsControllers.deleteComments = (req, res) => {
    const commentsIds = req.body.commentsIds || []
    console.log(req.body)
    const mapIdAndReturnDeletePromise = commentsIds.map(commentId => {
        return commentSchema.findByIdAndDelete(commentId, {useFindAndModify: false}).exec()
    })

    Promise.all(mapIdAndReturnDeletePromise).then(() => {
        console.log(res)
        res.sendStatus(200)
        res.end()
    }).catch(err => {
        console.log(err)
        res.sendStatus(500)
        res.end()
    })

}


postsControllers.export = (req, res) => {
    postSchema.find({}).exec().then(async exportData => {
        try {
            let finalData= []
            for await (let post of exportData){
                finalData = [...finalData,{
                    ...post.toObject(),
                    categories: post.categories ? await metaSchema.find({'_id': {$in: [...post.categories]}}).select('name type') : [],
                    tags: post.tags ? await metaSchema.find({'_id': {$in: [...post.tags]}}).select('name type') : [],
                    actors: post.actors ? await metaSchema.find({'_id': {$in: [...post.actors]}}).select('name type') : []
                }]
            }
            return finalData
        } catch (e) {
            console.log(e)
        }

    }).then(finalData => {
        console.log(finalData)
        res.json({exportedData: finalData})
        res.end()
    })


        .catch(err => {
            console.log(err)
            res.sendStatus(500)
            res.end()
        })

};


module.exports = postsControllers;