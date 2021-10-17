const commentSchema = require('../../../models/commentSchema');

module.exports = (req, res) => {
    const requestedSize = parseInt(req.body.size)
    const requestedPage = parseInt(req.body.pageNo)

    const size = requestedSize ? requestedSize > 50 ? 50 : requestedSize : 50
    const pageNo = requestedPage ? requestedPage : 1

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

    const comments = commentSchema.find({$and: [onDocument, status, searchQuery]},{},{sort:{createdAt:-1}}).populate([{path:'author',select:['username','profileImage']}]).skip(size * (pageNo - 1)).limit(size).sort(sortQuery).exec()
    const commentsCount = commentSchema.countDocuments({$and: [onDocument, status, searchQuery]}).exec()

    Promise.all([comments, commentsCount]).then(data => {
        res.json({comments: data[0], count: data[1]})
    }).catch(err => {
        console.error('comments :',err)
        res.end()
    })

};