import {postSchema, userSchema} from "models";

const setDraftPostToUserData = async (userId, draftPostId) => {
    try {
        return await userSchema.findByIdAndUpdate(userId, {$set: {draftPost: draftPostId}}, {new: true}).exec();
    } catch (error) {
        console.error('Error updating user draft post:', error);
        throw error;
    }
};

// GPT4 SOLUTION
const newPost = async (req, res) => {

    try {
        const newPostDataToSave = new postSchema(req.body.data);
        const userData = await userSchema.findById(req.userData._id).select('draftPost').exec()
        if (userData?.draftPost) {
            res.json({
                message: 'There Is An Existing Draft Post.',
                newPostId: userData.draftPost,
            });
        } else {
            newPostDataToSave.save(async (error: any, savedPostData: { _id: any; }) => {
                if (error) {
                    console.error('Error saving new post:', error);
                    return res.status(500).json({message: 'Something Went Wrong', type: 'error'});
                }

                try {
                    await setDraftPostToUserData(userData._id, savedPostData._id)
                    res.json({
                        message: 'Post successfully created. After a moderator review',
                        newPostId: savedPostData._id,
                    });
                } catch (e) {
                    console.error('Error updating user draft post:', e);
                    res.status(500).json({message: 'Something Went Wrong', type: 'error'});
                }
            });
        }
    } catch (error) {
        console.error('Error creating new post:', error);
        res.status(500).json({message: 'Something Went Wrong', type: 'error'});
    }
};
export default newPost

