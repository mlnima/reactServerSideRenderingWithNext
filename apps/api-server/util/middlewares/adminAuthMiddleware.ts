import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import userSchema from '@schemas/userSchema';

const adminAuthMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let token = req.body.token || req.query.token || null;
    const authHeader = req?.headers?.authorization;
    if (!token && authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized: No token provided',
        });
    }

    let verifiedToken: string | JwtPayload;

    try {
        verifiedToken = jwt.verify(token, process.env.JWT_KEY as string);
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid token',
        });
    }

    const user = await userSchema
        .findById((verifiedToken as JwtPayload)._id,null,{lean:true})
        .exec();
    if (user && user.role === 'administrator') {

        req.userData = {
            //@ts-ignore
            ...verifiedToken,
            isAdmin:true
        };
        next();
    } else {
        return res.status(401).json({
            message: 'User not authorized',
        });
    }
};

export default adminAuthMiddleware;
