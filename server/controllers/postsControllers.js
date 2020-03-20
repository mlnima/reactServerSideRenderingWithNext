let postsControllers = {};
const postSchema = require('../models/postSchema');
const metaSchema = require('../models/metaSchema');

postsControllers.createNewPost = (req, res) => {
    const newPost = req.body.postData
    if(newPost.tags){
        newPost.tags.forEach(tag=>{
            const tagDataToSave = new metaSchema({name:tag,
                type:'tag'})
            tagDataToSave.save()
        })
    }
    if(newPost.categories){
        newPost.categories.forEach(category=>{
            const categoryDataToSave = new metaSchema({name:category,
                type:'category'})
            categoryDataToSave.save()
        })
    }
    if(newPost.actors){
        newPost.actors.forEach(actor=>{
            const actorDataToSave = new metaSchema({name:actor,
                type:'actor'})
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
    const _id = req.body.id ;
    postSchema.findByIdAndUpdate(req.body.postData._id,req.body.postData,{new:true}).exec().then(updated=>{
        console.log(_id, updated)
    }).catch(err=>{
        res.sendStatus(500);
        res.end()
    })
};




postsControllers.getPostsInfo = async (req, res) => {
    const size = req.body.size;
    const pageNo = req.body.pageNo;
    const regexQuery = new RegExp(req.body.keyword, 'i');
    let postTypeQuery = req.body.postType=== 'all' ? {} : { postType: req.body.postType };
    let statusQuery = req.body.status === 'all' ? { status: { $ne: 'trash' } } : { status: req.body.status };
    let authorQuery = req.body.author === 'all' ? {} : { author: req.body.author };
    let searchQuery = req.body.keyword === '' ? {} : { $or: [ { title:regexQuery }, { description:regexQuery } ]  };
    let selectedFields = req.body.fields[0]==='all'?{}:fieldGenerator(req.body.fields);
    let posts = await postSchema.find({$and:[postTypeQuery,statusQuery,authorQuery,searchQuery]}).select(selectedFields).skip(size * (pageNo - 1)).limit(size).sort('-_id').exec();
    let postsCount = await postSchema.count({$and:[postTypeQuery,statusQuery,authorQuery,searchQuery]}).exec();

    Promise.all([ posts, postsCount ]).then(data => {
        res.json({ posts: data[0], error: false, totalCount: data[1] })
        res.end()
    }).catch(err => {
        return res.status(500).json({
            message: 'Server Error'
        })
    })

};

postsControllers.getPostInfo =  (req, res) =>{
    const _id = req.body._id;
    const postTitle = req.body.postTitle;
    if (postTitle){
        postSchema.findOne({title:postTitle}).exec().then(post=>{
            res.json({ post, error: false });
            res.end()
        })
    }else if (_id){
        postSchema.findById(_id).exec().then(post=>{
            res.json({ post, error: false });
            res.end()
        }).catch(err=>{
            console.log( err);
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

postsControllers.likeDislikeView = (req, res)=>{
    postSchema.findByIdAndUpdate(req.body.id,{$inc:{[req.body.type]:1}},{new:true}).exec();
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






module.exports = postsControllers;