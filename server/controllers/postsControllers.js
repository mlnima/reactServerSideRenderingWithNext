let postsControllers = {};
const postSchema = require('../models/postSchema');
const metaSchema = require('../models/metaSchema');

postsControllers.createNewPost = (req, res) => {
    const newPost = req.body.postData
    if (newPost.tags) {
        newPost.tags.forEach(tag => {
            const tagDataToSave = new metaSchema({
                name: tag,
                type: 'tag'
            })
            tagDataToSave.save()
        })
    }
    if (newPost.categories) {
        newPost.categories.forEach(category => {
            const categoryDataToSave = new metaSchema({
                name: category,
                type: 'category'
            })
            categoryDataToSave.save()
        })
    }
    if (newPost.actors) {
        newPost.actors.forEach(actor => {
            const actorDataToSave = new metaSchema({
                name: actor,
                type: 'actor'
            })
            actorDataToSave.save()
        })
    }
    const newPostDataToSave = new postSchema(newPost);
    newPostDataToSave.save().then(savedPostData => {
        console.log(savedPostData, ' saved ');
        res.json({ savedPostData });
        res.end()
    }).catch(err => {
        console.log(err)
        res.sendStatus(500);
        res.end()
    })
};

postsControllers.updatePost = (req, res) => {
    const _id = req.body.id;
    postSchema.findByIdAndUpdate(req.body.postData._id, req.body.postData, { new: true }).exec().then(updated => {
        console.log(_id, updated)
    }).catch(err => {
        res.sendStatus(500);
        res.end()
    })
};

postsControllers.getPostsInfo = async (req, res) => {
    console.log( req.query)
    const size = parseInt(req.body.size) > 100 ? 100 : parseInt(req.body.size)
    const pageNo = req.body.pageNo;
    let postTypeQuery = req.body.postType === 'all' ? {} : { postType: req.body.postType };
    let statusQuery = req.body.status === 'all' ? { status: { $ne: 'trash' } } : { status: req.body.status };
    let authorQuery = req.body.author === 'all' ? {} : { author: req.body.author };
    let categoryQuery = req.body.category === 'all' ? {} : { categories: new RegExp(req.body.category, 'i') };
    let tagQuery = req.body.tag === 'all' ? {} : { tags: new RegExp(req.body.tag, 'i') };
    let actorQuery = !req.body.actor || req.body.actor === 'all' ? {} : { actors: new RegExp(req.body.actor, 'i') };
    let searchQuery = req.body.keyword === '' ? {} : {
        $or: [
            { categories: new RegExp(req.body.category, 'i') },
            { tags: new RegExp(req.body.tag, 'i') },
            { actors: new RegExp(req.body.actor, 'i') },
            { title: new RegExp(req.body.keyword, 'i') },
            { description: new RegExp(req.body.keyword, 'i') } ]
    };
    let selectedFields = req.body.fields[0] === 'all' ? {} : fieldGenerator(req.body.fields);
    let sortQuery = req.body.sort === 'latest' ? '-_id' : { [req.body.sort]: -1 }

    let posts = await postSchema.find({ $and: [ postTypeQuery, statusQuery, authorQuery, searchQuery, categoryQuery, tagQuery, actorQuery ] }).select(selectedFields).skip(size * (pageNo - 1)).limit(size).sort(sortQuery).exec();
    let postsCount = await postSchema.count({ $and: [ postTypeQuery, statusQuery, authorQuery, searchQuery, categoryQuery, tagQuery, actorQuery ] }).exec()

    Promise.all([ posts, postsCount ]).then(data => {
        res.json({ posts: data[0], error: false, totalCount: data[1] })
        res.end()
    }).catch(err => {
        return res.status(500).json({
            message: 'Server Error'
        })
        res.end()
    })

};

postsControllers.getPostInfo = (req, res) => {
    const _id = req.body._id;
    const postTitle = req.body.postTitle;
    if (postTitle) {
        postSchema.findOne({ title: postTitle }).exec().then(post => {
            res.json({ post, error: false });
            res.end()
        })
    } else if (_id) {
        postSchema.findById(_id).exec().then(post => {
            res.json({ post, error: false });
            res.end()
        }).catch(err => {
            console.log(err);
            return res.status(500).json({
                message: 'Server Error'
            })
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
    const ids = req.body.ids;
    const status = req.body.status;
    // console.log(ids,status )
    let promises = [];
    for await (let id of ids) {
        promises.push(postSchema.findByIdAndUpdate(id, { $set: { status } }))
    }
    Promise.all(promises).then(() => {
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

function fieldGenerator(fields) {
    // if (fields[0] === 'all')
    let exportData = '';
    for (let filed of fields) {
        exportData += ` ${ filed } , `
    }
    return exportData
};

postsControllers.getMeta = async (req, res) => {
    const type = req.body.type;
    const size = req.body.size;
    const pageNo = req.body.pageNo;
    let sortQuery = req.body.sort === 'latest' ? '-_id' : { [req.body.sort]: -1 }

    const metaCount = await metaSchema.count({ type }).exec()
    metaSchema.find({ type }).limit(size).skip(size * (pageNo - 1)).sort(sortQuery).exec().then(async metas => {
        const mapMetaToGetImage = metas.map(async meta => {
            let finalData = {
                name: meta.name,
                type: meta.type,
                description: meta.description,
                imageUrl: meta.imageUrl,
                noImageUrl: '',
                count: 0
            }
            await postSchema.find({ [req.body.searchForImageIn]: meta.name }).limit(1).sort('-_id').exec().then(lastPost => {
                if (lastPost[0]) {
                    finalData.noImageUrl = lastPost[0].mainThumbnail
                }
            })
            await postSchema.count({ [req.body.searchForImageIn]: meta.name }).exec().then(count => {
                finalData.count = count
            })

            return finalData

        })
        res.json({ metas: await Promise.all(mapMetaToGetImage), totalCount: metaCount })
        res.end()
    })

}

module.exports = postsControllers;