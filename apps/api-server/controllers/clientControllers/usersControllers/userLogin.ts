import { Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userSchema from "@schemas/userSchema";

interface ILoginRequest extends Request {
    body: {
        username: string;
        password: string;
    };
}

const tokenExpireTime = '365d';

const userLogin = async (req: ILoginRequest, res: Response) => {
    try {
        const { username, password } = req.body;

        const user: any | null = await userSchema.findOne({ username }).populate({
            path: 'profileImage',
            select: 'filePath',
            model: 'file',
            options: { strictPopulate: false }
        }).exec();

        if (!user) {
            return res.status(404).json({ message: 'Invalid username or password' });
        }

        const isPasswordCorrect: boolean = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token: string = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_KEY, {
            expiresIn: tokenExpireTime
        });

        const { username: userDataUsername, draftPost, role, keyMaster, profileImage, _id } = user;
        const userData = { username: userDataUsername, draftPost, role, keyMaster, profileImage, _id };

        res.json({ token, userData, message: 'Login successful' });
    } catch (err) {
        console.log(err);
        res.status(503).json({ message: 'Something went wrong. Please try again later.' });
    }
};

export default userLogin;

