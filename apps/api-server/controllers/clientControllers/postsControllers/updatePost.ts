import {postSchema} from "models";
import mongoose from "mongoose";

const updatePost = async (req, res) => {
    try {
        const postData = req.body?.data;
        if (!postData) res.status(500).json({message: 'Something Went Wrong', type: 'error'})

        const userId =  new mongoose.Types.ObjectId(req.userData._id);
        const authorId =  new mongoose.Types.ObjectId(postData?.author);
        const isAuthorizedToUpdate = (userId.toString() === authorId.toString()) || req.userData.role === 'administrator';

        if (!isAuthorizedToUpdate) {
            res.status(403).json({message: 'You are not authorized to update this post', type: 'error'});
        }

        //create a post if it doesn't exist by upsert
        const updatedPost = await postSchema.findOneAndUpdate({_id:postData?._id}, {...postData}, {
            new: true,
            upsert: true
        }).exec()

        res.status(200).json({updatedPost})

    } catch (error) {
        console.log(error)
        //@ts-ignore
        res.status(500).json({message: 'Something Went Wrong', type: 'error'})
    }
}

export default updatePost