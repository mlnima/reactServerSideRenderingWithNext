const commentSchema = require('../../../models/commentSchema');

module.exports = async (req, res) => {

    const onDocument = req.query.onDocument ? {onDocumentId: req.query.onDocument} : {}

    const comments = await commentSchema
                     .find(onDocument,{},{sort:{createdAt:-1}})
                     .populate([{path:'author',select:['username','profileImage']}]).exec()
   console.log(comments)

    Promise.all([comments]).then(data => {
        res.json({comments: data[0],})
    }).catch(err => {
        console.error('comments :',err)
        res.end()
    })

};