const dataEncoder = require('../tools/dataEncoder')

let postsControllers = {};
const postSchema = require('../models/postSchema');
const metaSchema = require('../models/metaSchema');
const commentSchema = require('../models/commentSchema');

const metasSaver = async (metas, type) => {
    metas.forEach(meta => {
        const metaDataToSave = new metaSchema({
            name: meta,
            type
        })
        metaDataToSave.save().then(saved => {

        }).catch(err => {

        })
    })
}

const metaCountSetter = (metas, type) => {
    const typeSyncToPostMeta = type === 'tag' ? 'tags' :
        type === 'category' ? 'categories' :
            type === 'actor' ? 'actors' : ''

    metas.forEach(async meta => {
        // const metaPostCount = await postSchema.count({name:meta})

        // console.log( await postSchema.count({[typeSyncToPostMeta]:new RegExp(meta, 'i')}).exec())
        await metaSchema.findOneAndUpdate({ name: meta }, { count: await postSchema.count({ [typeSyncToPostMeta]: new RegExp(meta, 'i') }) })
    })
}

function fieldGenerator(fields) {
    // if (fields[0] === 'all')
    let exportData = '';
    for (let filed of fields) {
        exportData += ` ${ filed } , `
    }
    return exportData
};

postsControllers.createNewPost = (req, res) => {
    // res.end()
    const newPost = req.body.postData;
    if (newPost.tags) {
        metasSaver(newPost.tags, 'tag').then(() => {
            metaCountSetter(newPost.tags, 'tag')
        })
    }
    if (newPost.categories) {
        metasSaver(newPost.categories, 'category').then(() => {
            metaCountSetter(newPost.categories, 'category')
        })
    }
    if (newPost.actors) {
        metasSaver(newPost.actors, 'actor').then(() => {
            metaCountSetter(newPost.actors, 'actor')
        })
    }

    newPost.lastModify = Date.now()
    const newPostDataToSave = new postSchema(newPost);
    newPostDataToSave.save().then(savedPostData => {

        res.json({ savedPostData });
        res.end()
    }).catch(err => {
        if (err.code === 11000) {
            res.status(500).send({ error: 'Post with this Title already exist in the Database' })
            // res.json({ savedPostData });
            res.end()
        } else {
            res.sendStatus(500);
            res.end()
        }
    })
};

postsControllers.updatePost = (req, res) => {
    const _id = req.body.id;
    const updated = { ...req.body.postData, lastModify: Date.now() }
    postSchema.findByIdAndUpdate(req.body.postData._id, updated, { new: true }).exec().then(updated => {
        metasSaver(updated.tags, 'tag').then(() => {
            metaCountSetter(updated.tags, 'tag')
        })
        metasSaver(updated.categories, 'category').then(() => {
            metaCountSetter(updated.categories, 'category')
        })
        metasSaver(updated.actors, 'actor').then(() => {
            metaCountSetter(updated.actors, 'actor')
        })

        res.end()
    }).catch(err => {
        res.sendStatus(500);
        res.end()
    })

};

postsControllers.getPostsInfo = async (req, res) => {
    console.log('getPostsInfo not cached')

    const size = parseInt(req.body.size) > 100 ? 100 : parseInt(req.body.size)
    const pageNo = req.body.pageNo || 1;
    let postTypeQuery = req.body.postType === 'all' ? {} : { postType: req.body.postType };
    let statusQuery = req.body.status === 'all' ? { status: { $ne: 'trash' } } : { status: req.body.status };
    let authorQuery = req.body.author === 'all' ? {} : { author: req.body.author };
    let categoryQuery = req.body.category === 'all' ? {} : { categories: new RegExp(req.body.category, 'i') };
    let tagQuery = req.body.tag === 'all' ? {} : { tags: new RegExp(req.body.tag, 'i') };
    let actorQuery = !req.body.actor || req.body.actor === 'all' ? {} : { actors: new RegExp(req.body.actor, 'i') };

    let searchQuery = req.body.keyword === '' ? {} : {
        $or: [
            { actors: new RegExp(req.body.actor, 'i') },
            { title: new RegExp(req.body.keyword, 'i') },
            { description: new RegExp(req.body.keyword, 'i') } ]
    };
    let selectedFields = req.body.fields[0] === 'all' ? {} : fieldGenerator(req.body.fields);
    let sortQuery = req.body.sort === 'latest' ? '-_id' : { [req.body.sort]: -1 }

    let posts = await postSchema.find({ $and: [ postTypeQuery, statusQuery, authorQuery, searchQuery, categoryQuery, tagQuery, actorQuery ] }).select(selectedFields).skip(size * (pageNo - 1)).limit(size).sort(sortQuery).exec();
    let postsCount = await postSchema.countDocuments({ $and: [ postTypeQuery, statusQuery, authorQuery, searchQuery, categoryQuery, tagQuery, actorQuery ] }).exec()

    Promise.all([ posts, postsCount ]).then(data => {
        res.json({ posts: data[0], error: false, totalCount: data[1] })
        res.end()
    }).catch(err => {
        return res.status(500).json({
            message: 'Server Error'
        })

    })

};

postsControllers.getPostInfo = (req, res) => {
    console.log('getPostInfo not cached')
    const title = req.body.postTitle;
    const _id = req.body._id;
    if (title) {
        postSchema.findOne({ title }).exec().then(async post => {
            const postValue = post ? post.toObject():post
            const commentValue = post?commentSchema.find({ onDocument: post._id }).exec():null
            const postData = {
                ...postValue,
                comments: commentValue
            }
            res.json({ post: dataEncoder({ post }), error: false, postData });
            res.end()
        })
    } else if (_id) {
        postSchema.findOne({ _id }).exec().then(post => {
            res.json({ post: dataEncoder({ post }), error: false });
            res.end()
        })
    }
};

postsControllers.deletePost = (req, res) => {
    const _id = req.body._id;
    postSchema.findByIdAndDelete(_id).then(() => {
        res.json({ message: `${ _id } Deleted Permanently`, error: false });
        res.end()
    }).catch(() => {
        res.json({ message: `Can Not Delete ${ _id } Something Went Wrong`, error: true });
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
            return postSchema.findByIdAndUpdate(id, { $set: { status } })
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
    postSchema.findByIdAndUpdate(req.body.id, { $inc: { [req.body.type]: 1 } }, { new: true }).exec();
    res.end()
};

postsControllers.getMeta = async (req, res) => {
    console.log('not cached')
    const type = req.body.type ? { type: req.body.type } : {}
    const size = req.body.size;
    const page = req.body.page;
    const startWithQuery = req.body.startWith === 'any' ? {} : { name: { $regex: '^' + req.body.startWith, $options: 'i' } }
    let searchQuery = req.body.keyword === '' ? {} : {
        $or: [
            { name: new RegExp(req.body.keyword, 'i') },
            { description: new RegExp(req.body.keyword, 'i') } ]
    };
    let sortQuery = !req.body.sort || req.body.sort === 'latest' ? '-id' : req.body.sort && typeof req.body.sort === 'string' ? req.body.sort : { [req.body.sort]: -1 }
    const metaCount = await metaSchema.countDocuments({ $and: [ type, searchQuery, startWithQuery ] }).exec()
    metaSchema.find({ $and: [ type, searchQuery, startWithQuery ] }).limit(size).skip(size * (page - 1)).sort(sortQuery).exec().then(async metas => {
        const mapMetaToGetImage = metas.map(async meta => {
            return {
                ...meta.toObject(),
                count: await postSchema.countDocuments({ [req.body.searchForImageIn]: meta.name }).exec(),
                noImageUrl: await postSchema.find({ [req.body.searchForImageIn]: meta.name }).limit(1).sort('-_id').exec().then(lastPost => {
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
        res.json({ metas: await Promise.all(mapMetaToGetImage), totalCount: metaCount })
        res.end()
    }).catch(err => {
        // console.log( err)
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
    const onDocument = req.body.onDocument ? { onDocument: req.body.onDocument } : {}
    const status = !req.body.status || req.body.status === 'all' ? { status: 'approved' } : { status: req.body.status }
    let sortQuery = req.body.sort === 'latest' ? '-_id' : { [req.body.sort]: -1 }
    const searchQuery = !req.body.keyword ? {} : {
        $or: [
            { author: new RegExp(req.body.keyword, 'i') },
            { body: new RegExp(req.body.keyword, 'i') },
            { email: new RegExp(req.body.keyword, 'i') },
        ]
    };

    const comments = commentSchema.find({ $and: [ onDocument, status, searchQuery ] }).skip(size * (pageNo - 1)).limit(size).sort(sortQuery).exec()
    const commentsCount = commentSchema.countDocuments({ $and: [ onDocument, status, searchQuery ] }).exec()

    Promise.all([ comments, commentsCount ]).then(data => {
        res.json({ comments: data[0], count: data[1] })
        res.end()
    }).catch(err => {
        console.log(err)
    })

};

postsControllers.updateComment = (req, res) => {
    commentSchema.findByIdAndUpdate(req.body._id, req.body.update, { new: true }).exec().then(updated => {
        res.end()
    })
};

postsControllers.deleteComments = (req, res) => {
    const commentsIds = req.body.commentsIds || []
    console.log(req.body)
    const mapIdAndReturnDeletePromise = commentsIds.map(commentId => {
        return commentSchema.findByIdAndDelete(commentId, { useFindAndModify: false }).exec()
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
    postSchema.find({}).exec().then(exportedData=>{
        res.json({ exportedData })
        res.end()
    }).catch(err=>{
        console.log( err)
        res.sendStatus(500)
        res.end()
    })

};





module.exports = postsControllers;