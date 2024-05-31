import {CommentSchema} from 'shared-schemas';

const adminGetComments = async (req, res) => {

    try {
        const size =req.query.size ? parseInt(req.query.size) > 50 ? 50 : parseInt(req.query.size) : 40
        const page = req.query.page ? parseInt(req.query.page) : 1
        const onDocument = req.query.onDocument ? {onDocumentId: req.query.onDocument} : {}
        const status = !req.query.status || req.query.status === 'all' ? {status: 'approved'} : {status: req.query.status}
        const sortQuery = (req.query.sort === 'latest' || !req.query.sort) ? {_id: -1} : {[req.query.sort]: -1}
        const searchQuery = !req.query.keyword ? {} : {
            $or: [
                {author: new RegExp(req.query.keyword, 'i')},
                {body: new RegExp(req.query.keyword, 'i')},
                {email: new RegExp(req.query.keyword, 'i')},
            ]
        };


        const comments = await CommentSchema.find({$and: [onDocument, status, searchQuery]})
            .skip(size * (page - 1))
            .limit(size)
            // @ts-ignore
            .sort(sortQuery)
            // .populate({$and:['author','onDocumentId']})
            .populate([
                {path: 'author', select: {'username': 1}},
                {path: 'onDocumentId', select: {'title': 1, 'postType': 1}},
            ])
            .exec()
        const totalCount = await CommentSchema.countDocuments({$and: [onDocument, status, searchQuery]}).exec()

        res.json({comments, totalCount})

    }catch (error) {

    }



};

export default adminGetComments;