import { Request, Response } from 'express';
import { UserSchema } from 'shared-schemas';
import {User} from "typescript-types";

interface ISignedInUserDataRequest extends Request {
    userData: { _id: string };
    body: {
        fields?: string[];
    };
}

const getSignedInUserData = async (req: ISignedInUserDataRequest, res: Response) => {

    try {
        const { _id } = req.userData;
        const { fields } = req.body;

        const user: User | null = await UserSchema.findById(_id)
            .select(fields || ['username', 'role', 'profileImage'])
            .populate({
                path: 'profileImage',
                select: 'filePath',
                model: 'file',
                options: { strictPopulate: false }
            })
            .exec();

        if (!user) {
            return res.status(404).send();
        }

        res.json({ userData: user });
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
};

export default getSignedInUserData;
