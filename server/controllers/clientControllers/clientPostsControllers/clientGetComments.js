const commentSchema = require('../../../models/commentSchema');

module.exports = async (req, res) => {
    const onDocument = req.query.onDocument ? {onDocumentId: req.query.onDocument} : {}

   await commentSchema.find(onDocument,{},{sort:{createdAt:-1}})
                      .populate([{path:'author',select:['username','profileImage']}])
                      .exec()
                      .then(comments=>{
                           res.json({comments})
                       })
};