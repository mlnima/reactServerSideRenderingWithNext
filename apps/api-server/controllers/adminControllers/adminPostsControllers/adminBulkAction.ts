import postSchema from "@schemas/postSchema";
import metaSchema from "@schemas/metaSchema";
import commentSchema from "@schemas/commentSchema";
import userSchema from "@schemas/userSchema";

const adminBulkAction = async (req, res) => {
    const type = req.body.type
    const status = req.body.status
    const ids = req.body.ids
    let actionsPromise:{}[];

    const targetSchema = type === 'posts' ? postSchema :
        type === 'metas' ? metaSchema :
            type === 'comments' ? commentSchema :
                type === 'users' ? userSchema : null
    if (status === 'delete') {
        actionsPromise = ids.map(id => {
            targetSchema.findByIdAndDelete(id)
        })
    } else {
        actionsPromise = ids.map((id:string) => {
            //@ts-ignore
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