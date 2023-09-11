import {Request, Response} from 'express';
import {postSchema, userSchema} from 'models';

interface IGetUserQuery {
    username: string;
    _id: string;
    fields?: string[];
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const {username, _id, fields} = req.query as unknown as IGetUserQuery;
        const defaultFields = ['username', 'role', 'profileImage', 'about', 'firstName', 'lastName', 'nickName'];
        const selectedFields = fields ? [...defaultFields, ...fields] : defaultFields;

        userSchema
            .findOne({$or: [{username}, {_id}]})
            .select(selectedFields)
            .populate([
                {path: 'profileImage', select: {'filePath': 1}, model: 'file'},
                {path: 'images', select: {'filePath': 1}, model: 'file'},
            ])
            .exec()
            .then((user) => {
                res.json({userData: user});
            })
            .catch((err) => {
                console.error('Error fetching user:', err);
                res.status(500).json({message: 'Something went wrong'});
            });
    } catch (e) {
        console.error('Error in getUser function:', e);
        res.status(500).json({message: 'Something went wrong'});
    }
};


interface IGetUserPageInitialDataQuery {
    username: string;
    userId: string;
    userWhoRequestIt: string;
    fields?: string[];
}


export const getUserPageInitialData = async (req: Request, res: Response) => {
    try {
        const {username, userWhoRequestIt, fields} = req.query as unknown as IGetUserPageInitialDataQuery;

        const pipeline = [
            {
                $match: {username}
            },
            {
                $lookup: {
                    from: 'files',
                    localField: 'profileImage',
                    foreignField: '_id',
                    as: 'profileImage'
                }
            },
            {
                $unwind: {
                    path: '$profileImage',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    username: 1,
                    profileImage: '$profileImage.filePath',
                    followersCount: {$size: '$followers'},
                    followingCount: {$size: '$following'},
                    didThisUserBlockRequester: {$in: [userWhoRequestIt, '$blockList']},
                    isFollowed: {$in: [userWhoRequestIt, '$followers']}
                }
            }
        ];

        const [userData] = await userSchema.aggregate(pipeline).exec();

        if (!userData) {
            return res.status(404).json({message: 'UserModel not found'});
        }

        const [didRequesterBlockThisUser, didRequesterFollowThisUser,postsCount] = await Promise.all([
            userSchema.exists({'blockList': {$in: [userData._id]}}),
            userSchema.exists({'following': {$in: [userData._id]}}),
            postSchema.estimatedDocumentCount({author:userData._id})
        ]);

        userData.didRequesterBlockThisUser = !!didRequesterBlockThisUser;
        userData.didRequesterFollowThisUser = !!didRequesterFollowThisUser;
        userData.postsCount = postsCount;

        res.status(200).json(userData);
    } catch (error) {
        console.error('Error in getUserPageData function:', error);
        res.status(500).json({message: 'Something went wrong'});
    }
};




