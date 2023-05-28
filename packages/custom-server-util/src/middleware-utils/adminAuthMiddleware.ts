import jwt from 'jsonwebtoken';
import {userSchema} from 'models';
import {Request, Response, NextFunction} from 'express';

interface RequestWithUserData extends Request {
    userData?: {};
}

const adminAuthMiddleware = async (req: RequestWithUserData, res: Response, next: NextFunction) => {
    const token = req.body.token || req.query.token
    if (!token) {
        return res.status(401).json({
            message: 'No token provided'
        });
    }

    let verifiedToken;

    try {
        verifiedToken = jwt.verify(token, process.env.JWT_KEY as string)
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }

    //@ts-ignore
    const user = await userSchema.findById(verifiedToken._id).exec();
    if (user && user.role === 'administrator') {
        req.userData = verifiedToken
        next()
    } else {
        return res.status(401).json({
            message: 'User not authorized'
        });
    }
};

export default adminAuthMiddleware
