import {PostSchema,MetaSchema,UserSchema,CommentSchema} from 'shared-schemas';

const adminBulkAction = async (req, res) => {
    const type = req.body.type
    const status = req.body.status
    const ids = req.body.ids
    let actionsPromise:{}[];

    const targetSchema = type === 'posts' ? PostSchema :
        type === 'metas' ? MetaSchema :
            type === 'comments' ? CommentSchema :
                type === 'users' ? UserSchema : null
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

export default adminBulkAction;