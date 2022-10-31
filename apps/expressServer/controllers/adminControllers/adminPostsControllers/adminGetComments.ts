import commentSchema from '../../../../../packages/models/src/commentSchema';

const adminGetComments = (req, res) => {
    const size = parseInt(req.body.size) > 50 ? 50 : parseInt(req.body.size)
    const pageNo = req.body.pageNo ? parseInt(req.body.pageNo) : 1
    const onDocument = req.body.onDocument ? {onDocumentId: req.body.onDocument} : {}
    const status = !req.body.status || req.body.status === 'all' ? {status: 'approved'} : {status: req.body.status}
    //  let sortQuery = req.body.sort === 'latest' ? '-_id' : {[req.body.sort]: -1}
    const sortQuery = req.body.sort === 'latest' ? {_id: -1} : {[req.body.sort]: -1}
    const searchQuery = !req.body.keyword ? {} : {
        $or: [
            {author: new RegExp(req.body.keyword, 'i')},
            {body: new RegExp(req.body.keyword, 'i')},
            {email: new RegExp(req.body.keyword, 'i')},
        ]
    };

    // @ts-ignore
    const comments = commentSchema.find({$and: [onDocument, status, searchQuery]})
        .skip(size * (pageNo - 1))
        .limit(size)
        // @ts-ignore
        .sort(sortQuery)
        // .populate({$and:['author','onDocumentId']})
        .populate([
            {path: 'author', select: {'username': 1}},
            {path: 'onDocumentId', select: {'title': 1, 'postType': 1}},
        ])
        .exec()
    const commentsCount = commentSchema.countDocuments({$and: [onDocument, status, searchQuery]}).exec()

    Promise.all([comments, commentsCount]).then(data => {
        res.json({comments: data[0], count: data[1]})
    }).catch(err => {
        console.log(err)
    })

};

export default adminGetComments;