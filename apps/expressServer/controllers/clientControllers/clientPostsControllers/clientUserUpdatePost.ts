import postSchema from '../../../../../packages/models/src/postSchema';

const clientUserCreateNewPost = async (req, res) => {
    const postData = req.body.postData;

    const onErrorHandler = (error) => {
        res.json({response: 'something is wrong', type: 'error', error: error})
    }

    try {

        const update = {
            ...postData,
        }

        postSchema.findByIdAndUpdate(postData._id, update, {new: true}).exec().then(updatedPost => {
            res.json({
                message: 'post successfully updated after a moderator review changes will be published',
                post: updatedPost
            });
        }).catch(error => {
            if (error.code === 11000) {
                res.status(400).json({
                    message: 'Post with this title already exist in the Database', type: 'error'
                })
            } else {
                res.status(500).json({
                    message: 'Something Went Wrong', type: 'error'
                })
            }
        })

    } catch (error) {
        onErrorHandler(error)
    }

}

export default clientUserCreateNewPost;


