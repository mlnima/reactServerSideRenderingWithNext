const commentSchema = require('../../../models/commentSchema');

module.exports = (req, res) => {
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