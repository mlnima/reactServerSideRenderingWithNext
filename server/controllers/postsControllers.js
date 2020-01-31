let postsControllers = {};
const postSchema = require('../models/postSchema');


postsControllers.createNewPost = (req,res)=>{
    console.log( req.body.postData)
    const newPostData = new postSchema(req.body.postData);
    newPostData.save().then(savedPostData=>{
        console.log(savedPostData, ' saved ' );
        res.json({savedPostData});
        res.end()
    }).catch(err=>{
        res.sendStatus(500);
        res.end()
    })
};


postsControllers.getPostsInfo = async (req,res)=>{
    await postSchema.find({}).limit(req.body.limit).skip(req.body.limit * (req.body.pageNo -1)).exec().then(posts=>{
        res.json({posts});
    })

};

module.exports = postsControllers;