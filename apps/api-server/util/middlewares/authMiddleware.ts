import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req?.headers?.authorization;
    const token =
        req.body.token ||
        req.query.token ||
        (authHeader && authHeader.split(' ')[1]);


    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        //@ts-ignore
        req.userData = jwt.verify(token, process.env.JWT_KEY as string);
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or Expired token' });
    }
};

export default authMiddleware;
