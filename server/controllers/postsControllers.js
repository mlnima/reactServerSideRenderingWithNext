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


let image = {
    "images": [],
    "quality": "HD",
    "comments": [],
    "categories": ["Straight"],
    "actors": ["rachel steele"],
    "tags": ["Rachel steele", "Amateur", "Blowjob", "Milf", "Grandfather", "See through", "Truth", "Truth about"],
    "likes": 0,
    "disLikes": 0,
    "views": 14,
    "duration": "03:35",
    "lastModify": "2020-06-01T17:32:44.835Z",
    "author": "5ea6024fc2b554601ea04ad3",
    "title": "Rachel Steele's - The Truth About Your Grandfather - HD",
    "description": "",
    "mainThumbnail": "https://thumb-v-cl2.xhcdn.com/a/mcRkYb13ZOpvZMZvpRt0nw/001/820/529/2000x2000.10.jpg",
    "videoTrailerUrl": "https://thumb-v9.xhcdn.com/a/nVhv7dWMKB6F5r3lPlSOTg/001/820/529/240x135.t.mp4",
    "videoEmbedCode": "https://xhamster.com/embed/1820529",
    "status": "published",
    "postType": "video",
    "sourceSite": "xhamster"
}


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
            console.log(savedPostData)
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
    console.log('getPostsInfo not cached')

    const size = parseInt(req.body.size) > 100 ? 100 : parseInt(req.body.size)
    const pageNo = req.body.pageNo || 1;
    let postTypeQuery = req.body.postType === 'all' ? {} : {postType: req.body.postType};
    let statusQuery = req.body.status === 'all' ? {status: {$ne: 'trash'}} : {status: req.body.status};
    let authorQuery = req.body.author === 'all' ? {} : {author: req.body.author};
    let categoryQuery = req.body.category === 'all' ? {} : {categories: new RegExp(req.body.category, 'i')};
    let tagQuery = req.body.tag === 'all' ? {} : {tags: new RegExp(req.body.tag, 'i')};
    let actorQuery = !req.body.actor || req.body.actor === 'all' ? {} : {actors: new RegExp(req.body.actor, 'i')};

    let searchQuery = req.body.keyword === '' ? {} : {
        $or: [
            {actors: new RegExp(req.body.actor, 'i')},
            {title: new RegExp(req.body.keyword, 'i')},
            {description: new RegExp(req.body.keyword, 'i')}]
    };
    let selectedFields = req.body.fields[0] === 'all' ? {} : fieldGenerator(req.body.fields);
    let sortQuery = req.body.sort === 'latest' ? '-_id' : {[req.body.sort]: -1}

    let posts = await postSchema.find({$and: [postTypeQuery, statusQuery, authorQuery, searchQuery, categoryQuery, tagQuery, actorQuery]}).select(selectedFields).skip(size * (pageNo - 1)).limit(size).sort(sortQuery).exec();
    let postsCount = await postSchema.countDocuments({$and: [postTypeQuery, statusQuery, authorQuery, searchQuery, categoryQuery, tagQuery, actorQuery]}).exec()

    Promise.all([posts, postsCount]).then(async data => {
        const posts = data[0]
        let postsDataToSend = []
        try {
            for await (let post of posts) {
                let dataSetPost = {
                    ...post.toObject(),
                    author: post.author ? await userSchema.findById(post.author).exec() : {username: 'Private'},
                    categories: post.categories ? await metaSchema.find({'_id': {$in: [...post.categories]}}) : [],
                    tags: post.tags ? await metaSchema.find({'_id': {$in: [...post.tags]}}) : [],
                    actors: post.actors ? await metaSchema.find({'_id': {$in: [...post.actors]}}) : []
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

postsControllers.likeDislikeView = (req, res) => {
    postSchema.findByIdAndUpdate(req.body.id, {$inc: {[req.body.type]: 1}}, {new: true}).exec();
    res.end()
};

postsControllers.getMeta = async (req, res) => {

    const type = req.body.type ? {type: req.body.type} : {}
    const size = req.body.size;
    const page = req.body.page;
    const startWithQuery = req.body.startWith === 'any' ? {} : {name: {$regex: '^' + req.body.startWith, $options: 'i'}}
    let searchQuery = req.body.keyword === '' ? {} : {
        $or: [
            {name: new RegExp(req.body.keyword, 'i')},
            {description: new RegExp(req.body.keyword, 'i')}]
    };
    let sortQuery = !req.body.sort || req.body.sort === 'latest' ? '-id' : req.body.sort && typeof req.body.sort === 'string' ? req.body.sort : {[req.body.sort]: -1}
    const metaCount = await metaSchema.countDocuments({$and: [type, searchQuery, startWithQuery]}).exec()
    metaSchema.find({$and: [type, searchQuery, startWithQuery]}).limit(size).skip(size * (page - 1)).sort(sortQuery).exec().then(async metas => {
        const mapMetaToGetImage = metas.map(async meta => {
            return {
                ...meta.toObject(),
                count: await postSchema.countDocuments({[req.body.searchForImageIn]: meta.name}).exec(),
                noImageUrl: await postSchema.find({[req.body.searchForImageIn]: meta.name}).limit(1).sort('-_id').exec().then(lastPost => {
                    if (lastPost[0]) {
                        return lastPost[0].mainThumbnail
                    } else {
                        return undefined
                    }
                }).catch(err => {
                    console.log(err)
                })
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
    const onDocument = req.body.onDocument ? {onDocument: req.body.onDocument} : {}
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
    postSchema.find({}).exec().then(exportedData => {
        res.json({exportedData})
        res.end()
    }).catch(err => {
        console.log(err)
        res.sendStatus(500)
        res.end()
    })

};


module.exports = postsControllers;