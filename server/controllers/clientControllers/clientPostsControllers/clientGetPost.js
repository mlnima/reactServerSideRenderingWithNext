const postSchema = require('../../../models/postSchema');

module.exports = (req, res) => {
    const title = req.body.title;
    const _id = req.body._id;
    const findQuery = _id ? {_id} : {title:decodeURI(title)}
    postSchema.findOne(findQuery).populate([
        {path: 'categories'},
        {path: 'tags'},
        {path: 'actors'},
        {path: 'comment'}
    ]).exec().then(async post => {
        const postMessageToSend = {post, error: false}
        res.json(postMessageToSend);
        res.end()
    }).catch(err => {
        res.send(err)
        res.end()
    })
};