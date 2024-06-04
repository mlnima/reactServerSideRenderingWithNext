import {Request, Response} from 'express';
import userSchema from "@schemas/userSchema";

interface GetUsersRequestBody {
    usersList: string[];
}

const getUsers = async (req: Request<{}, {}, GetUsersRequestBody>, res: Response): Promise<void> => {
    try {
        const {usersList} = req.body;

        const users = await userSchema
            .find({_id: {$in: usersList}})
            .select(['username', 'role', 'profileImage', 'name', 'lastName', 'gender'])
            .populate([
                {
                    path: 'users',
                    select: ['username', 'profileImage'],
                    populate: {
                        path: 'profileImage',
                        model: 'file',
                    }
                },
            ])
            .exec();

        res.json({users});
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({message: 'Something went wrong'});
    }
};

export default getUsers;