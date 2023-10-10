import {postSchema, userSchema} from "models";
import mongoose from "mongoose";

const likeDislikePost = async (req, res) => {
    try {
        const userId = req.userData._id;
        const postId = new mongoose.Types.ObjectId(req.body._id);
        const type = req.body.type; // 'likes' or 'disLikes'
        const oppositeType = type === 'likes' ? 'disLikes' : 'likes';

        const user = await userSchema.findById(userId);

        const userField = type === 'likes' ? 'LikedPosts' : 'disLikedPosts';
        const oppositeField = type === 'likes' ? 'disLikedPosts' : 'LikedPosts';

        const alreadyDone = user[userField].some(id => id.equals(postId));
        const oppositeDone = user[oppositeField].some(id => id.equals(postId));

        let userUpdateQuery = {};
        let postIncQuery = { [type]: 0, [oppositeType]: 0 };

        if (oppositeDone) {
            userUpdateQuery = {
                $pull: { [oppositeField]: postId },
                $addToSet: { [userField]: postId }
            };
            postIncQuery[type] = 1;
            postIncQuery[oppositeType] = -1;
        } else if (alreadyDone) {
            userUpdateQuery = { $pull: { [userField]: postId } };
            postIncQuery[type] = -1;
        } else {
            userUpdateQuery = { $addToSet: { [userField]: postId } };
            postIncQuery[type] = 1;
        }

        // Update user
        await userSchema.findByIdAndUpdate(userId, userUpdateQuery);

        // Update post
        const updatedPost = await postSchema.findByIdAndUpdate(
            postId,
            { $inc: postIncQuery },
            { new: true }
        );

        res.status(200).json({
            likes: updatedPost.likes,
            disLikes: updatedPost.disLikes
        });
    } catch (error) {
        console.log('error=> ', error);
        res.status(500).send('Internal Server Error');
    }
};

export default likeDislikePost;



// const likeDislikePost = async (req, res) => {
//     try {
//         const userId = req.userData._id;
//         const postId = new mongoose.Types.ObjectId(req.body._id);
//         const type = req.body.type; // should be either 'likes' or 'disLikes'
//         const oppositeType = req.body.type === 'likes' ? 'disLikes' : 'likes'
//
//         const user = await userSchema.findById(userId);
//
//         const userField = type === 'likes' ? 'LikedPosts' : 'disLikedPosts';
//         const oppositeField = type === 'likes' ? 'disLikedPosts' : 'LikedPosts';
//
//         const alreadyDone = user[userField].some(id => id.equals(postId));
//         const oppositeDone = user[oppositeField].some(id => id.equals(postId));
//
//         let userUpdateQuery = {}, postUpdateQuery = {};
//
//         if (oppositeDone) {
//             // Remove from opposite list
//             userUpdateQuery = {$and:[{ $pull: { [oppositeField]: postId } },{ $addToSet: { [userField]: postId } }]};
//             postUpdateQuery = {$and:[{ $inc: { [type]: 1 } },{ $inc: { [oppositeType]: -1 } }]};
//         } else if (alreadyDone) {
//             // Remove if already liked/disliked
//             userUpdateQuery = { $pull: { [userField]: postId } };
//             postUpdateQuery = { $inc: { [type]: -1 } };
//         } else {
//             // Add new like/dislike
//             userUpdateQuery = { $addToSet: { [userField]: postId } };
//             postUpdateQuery = { $inc: { [type]: 1 } };
//         }
//
//         // Remove post ID from opposite field if it exists
//         if (oppositeDone) {
//             await userSchema.findByIdAndUpdate(userId, { $pull: { [oppositeField]: postId } });
//         }
//
//         // Update user's like/dislike list
//         await userSchema.findByIdAndUpdate(userId, userUpdateQuery);
//
//         // Update post's like/dislike count
//         const updatedPost = await postSchema.findByIdAndUpdate(
//             postId,
//             postUpdateQuery,
//             { new: true }
//         );
//
//         res.status(200).json({
//             likes: updatedPost.likes,
//             disLikes: updatedPost.disLikes
//         });
//     } catch (error) {
//         console.log('error=> ', error);
//         res.status(500).send('Internal Server Error');
//     }
// };
//
// export default likeDislikePost;




// const likeDislikePost = async (req, res) => {
//     try {
//         const userId = req.userData._id;
//         const postId = new mongoose.Types.ObjectId(req.body._id);
//         const type = req.body.type; // should be either 'likes' or 'disLikes'
//
//         const user = await userSchema.findById(userId);
//
//         // Determine which field to update in userSchema ('LikedPosts' or 'disLikedPosts')
//         const userField = type === 'likes' ? 'LikedPosts' : 'disLikedPosts';
//         const oppositeField = type === 'likes' ? 'disLikedPosts' : 'LikedPosts';
//
//         // Check if the user has already liked/disliked this post
//         const alreadyDone = user[userField].some(id => id.equals(postId));
//         const oppositeDone = user[oppositeField].some(id => id.equals(postId));
//
//         let updateQuery, incValue;
//
//         if (oppositeDone) {
//             // Remove from opposite list if exists
//             updateQuery = {
//                 $pull: { [oppositeField]: postId },
//             };
//             incValue = 0; // Neutralize the opposite action
//         } else if (alreadyDone) {
//             // Remove postId if user already liked/disliked
//             updateQuery = {
//                 $pull: { [userField]: postId },
//             };
//             incValue = -1; // Decrement like/dislike count
//         } else {
//             // Add postId to like/dislike
//             updateQuery = {
//                 $addToSet: { [userField]: postId },
//             };
//             incValue = 1; // Increment like/dislike count
//         }
//
//         // Update user's like/dislike list
//         await userSchema.findByIdAndUpdate(userId, updateQuery);
//
//         // Update post's like/dislike count
//         const updatedPost = await postSchema.findByIdAndUpdate(
//             postId,
//             { $inc: { [type]: incValue } },
//             { new: true }
//         );
//
//         res.status(200).json({
//             likes: updatedPost.likes,
//             disLikes: updatedPost.disLikes
//         });
//     } catch (error) {
//         console.log('error=> ', error);
//         res.status(500).send('Internal Server Error');
//     }
// };
//
// export default likeDislikePost;




















// import {postSchema, userSchema} from 'models';
// import mongoose from "mongoose";
//
// const likeDislikePost = async (req, res) => {
//
//     try {
//         const whereToSaveOnUserData = req.body.type === 'likes' ? 'LikedPosts' : req.body.type === 'disLikes' ? 'disLikedPosts' : null
//
//         if (!!whereToSaveOnUserData) {
//             await userSchema.findByIdAndUpdate(
//                 req.userData._id,
//                 {$addToSet: {[whereToSaveOnUserData]: new mongoose.Types.ObjectId(req.body._id)}}
//             )
//         }
//         await postSchema.findByIdAndUpdate(req.body._id, {$inc: {[req.body.type]: 1}})
//         res.status(200)
//         return
//     } catch (error) {
//         console.log('error=> ', error)
//         return
//     }
// };
//
// export default likeDislikePost