import jwt from 'jsonwebtoken';
import {userSchema} from 'models';
import {Request, Response, NextFunction} from 'express';

interface RequestWithUserData extends Request {
    userData?: {};
}

const adminAuthMiddleware = async (req: RequestWithUserData, res: Response, next: NextFunction) => {
    let token = req.body.token || req.query.token || null;
    const authHeader = req?.headers?.authorization;
    if (!token && authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized: No token provided'
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
            message: 'UserModel not authorized'
        });
    }
};

export default adminAuthMiddleware
