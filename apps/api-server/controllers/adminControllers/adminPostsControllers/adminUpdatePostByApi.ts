import {PostSchema} from 'shared-schemas';

const adminUpdatePostByApi = async (req, res) => {
    try {
        const updatedPostData = req.body.updatedPostData
        PostSchema.findByIdAndUpdate(updatedPostData._id, updatedPostData).exec().then(() => {
            res.json({message: updatedPostData._id + ' updated'})
        })

    } catch (err) {
        console.log(err)
    }
}

export default adminUpdatePostByApi;