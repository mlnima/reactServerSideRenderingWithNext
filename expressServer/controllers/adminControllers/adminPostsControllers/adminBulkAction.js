//adminBulkAction
const postSchema = require('../../../models/postSchema');
const metaSchema = require('../../../models/metaSchema');
const userSchema = require('../../../models/userSchema');
const commentSchema = require('../../../models/commentSchema');

module.exports = async (req, res) =>{
    const type = req.body.type
    const status = req.body.status
    const ids = req.body.ids
    let actionsPromise;

    const targetSchema = type === 'posts' ? postSchema :
        type === 'metas' ? metaSchema :
            type === 'comments' ? commentSchema :
                type === 'users' ? userSchema : null
    if (status === 'delete') {
        actionsPromise = ids.map(id => {
             targetSchema.findByIdAndDelete(id)
        })
    } else {
        actionsPromise = ids.map(id => {
            return targetSchema.findByIdAndUpdate(id, {$set: {status}})
        })
    }
    Promise.all(actionsPromise).then(() => {
        return res.status(200).json({
            message: 'all done'
        });
    }).catch(err => {
        return res.status(500).json({
            message: 'Server Error'
        });
    })

}