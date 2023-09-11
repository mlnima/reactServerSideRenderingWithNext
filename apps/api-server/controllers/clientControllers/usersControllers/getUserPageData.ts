import {Request, Response} from 'express';
import {userSchema} from 'models';

interface QueryParams {
    username: string;
    userId: string;
    userWhoRequestIt: string;
    fields?: string[];
}

const getUserPageData = async (req: Request, res: Response) => {
    try {
        console.log('getUserPageData=>')
        const {username, userWhoRequestIt, fields} = req.query as unknown as QueryParams;
        const defaultFields = ['username', 'role', 'profileImage', 'following', 'followers', 'blockList'];
        const selectedFields = fields ? [...new Set([...defaultFields, ...fields])] : defaultFields;

        const userWhoRequestItData = userWhoRequestIt
            ? await userSchema.findById(userWhoRequestIt).lean().select('blockList _id').exec()
            : null;

        const userData = await userSchema
            .findOne({username})
            .lean()
            .select(selectedFields.join(' '))
            .populate([
                {path: 'profileImage', select: 'filePath', model: 'file'},
                {path: 'images', select: 'filePath', model: 'file'},
            ])
            .exec();


        if (!userData) {
            return res.status(404).json({message: 'UserModel not found'});
        }

        const responseData = {
            _id: userData._id,
            username: userData.username,
            profileImage: userData.profileImage,
            followersCount: userData.followers?.length || 0,
            followingCount: userData.following?.length || 0,
            isBlocked: (userWhoRequestItData?.blockList || []).includes(userData?._id) || (userData?.blockList || []).includes(userWhoRequestItData?._id) || false,
            isFollowed: (userData?.followers || []).includes(userWhoRequestItData?._id ? userWhoRequestItData?._id?.toString() : null) || false,
        }

        res.status(200).json(responseData);

    } catch (error) {
        console.error('Error in getUserPageData function:', error);
        res.status(500).json({message: 'Something went wrong'});
    }
};

export default getUserPageData;


// import {Request, Response} from 'express';
// import {userSchema} from 'models';
//
// interface QueryParams {
//     username: string;
//     userId: string;
//     userWhoRequestIt: string;
//     fields?: string[];
// }
//
// const getUserPageData = async (req: Request, res: Response) => {
//     try {
//         const {username,userId, userWhoRequestIt, fields} = req.query as unknown as QueryParams;
//         const defaultFields = ['username', 'role', 'profileImage','following','followers'];
//         const selectedFields = fields ? [...defaultFields, ...fields] : defaultFields;
//
//         const userWhoRequestItData = userWhoRequestIt ? await userSchema.findById(userWhoRequestIt).exec() : null;
//
//         const userData = await userSchema
//             .findOne({username})
//             .select(selectedFields)
//             .populate([
//                 {path: 'profileImage', select: {filePath: 1}, model: 'file'},
//                 {path: 'images', select: {filePath: 1}, model: 'file'},
//             ])
//             .exec();
//
//         if (!userData) {
//             return res.status(404).json({message: 'UserModel not found'});
//         }
//         //@ts-ignore
//         const userDataDoc = {...userData?._doc}
//
//         res.status(200).json({
//             _id: userData._id,
//             username: userData.username,
//             profileImage: userData.profileImage,
//             followersCount:userDataDoc?.followers?.length || 0,
//             followingCount:userDataDoc?.following?.length || 0,
//             isBlocked: ((userWhoRequestItData?.blockList||[]).includes(userData._id) || (userData.blockList ||[]).includes(userWhoRequestItData._id)) || false,
//             isFollowed: userWhoRequestIt && userData.followers ? userData.followers.includes(userWhoRequestItData._id) : false,
//         });
//
//     } catch (error) {
//         console.error('Error in getUserPageData function:', error);
//         res.status(500).json({message: 'Something went wrong'});
//     }
// };
//
// export default getUserPageData;
