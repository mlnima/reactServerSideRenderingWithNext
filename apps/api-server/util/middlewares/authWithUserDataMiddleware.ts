// @ts-nocheck
import jwt from 'jsonwebtoken';
import userSchema from '@schemas/userSchema';
import { NextFunction, Request, Response } from 'express';

const authWithUserDataMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        // Extract token from different sources
        let token = req.body.token || req.query.token || null;
        const authHeader = req?.headers?.authorization;
        // If token is not found in body or query, try header
        if (!token && authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }

        // If token is still not found, return unauthorized
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized: No token provided',
            });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);

        // Fetch user data

        const user = await userSchema
            .findById(decodedToken._id)
            .select('username role keyMaster')
            .lean()
            .exec()

        // If user is not found, return unauthorized
        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized: User not found',
            });
        }

        // Attach user data to request object
        //@ts-ignore
        req.userData = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized: Token verification failed',
            error: error.message,
        });
    }
};

export default authWithUserDataMiddleware;
