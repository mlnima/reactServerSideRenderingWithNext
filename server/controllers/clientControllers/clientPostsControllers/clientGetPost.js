const postSchema = require('../../../models/postSchema');

module.exports = (req, res) => {
    const title = req.query.title;
    const _id = req.query._id;
    const findQuery = _id ? {_id} : {title:decodeURIComponent(title)}
    postSchema.findOne(findQuery).populate([
        {path: 'categories',select:{'name':1,'type':1}},
        {path: 'tags',select:{'name':1,'type':1}},
        {path: 'actors',select:{'name':1,'type':1}},
        // {path: 'comments',populate:[{path:'author',select:{'username':1}}]}
    ]).exec().then(async post => {
        const postMessageToSend = {post, error: false}
        res.json(postMessageToSend);
        res.end()
    }).catch(err => {
        res.send(err)
        res.end()
    })
};