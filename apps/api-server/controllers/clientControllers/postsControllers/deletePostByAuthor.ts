import {postSchema, userSchema} from "models";

const deletePostByAuthor = async (req, res) => {
    try {

        if (!req.query.postId) {
            return res.status(400).json({
                message: 'Bad Request'
            })
        }

        const userData = req.userData
        const postId = req.query.postId

        const postData = await postSchema.findById(postId).select('author').exec()
        if (postData.author.toString() !== userData._id.toString()) {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }

        await postSchema.findByIdAndDelete(postId).exec()
        await userSchema.findByIdAndUpdate(req.userData._id, {$unset: {draftPost: 1}}).exec()


        res.status(200).json({message: 'Post Deleted Successfully'})

    } catch (error) {

    }

}

export default deletePostByAuthor;