// @ts-nocheck
import jwt from 'jsonwebtoken';
import { UserSchema } from 'shared-schemas';

const authWithUserDataMiddleware = async (req, res, next) => {
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
                message: 'Unauthorized: No token provided'
            });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);

        // Fetch user data
        const user = await UserSchema.findById(decodedToken._id).select('username role keyMaster').exec();

        // If user is not found, return unauthorized
        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized: User not found'
            });
        }

        // Attach user data to request object
        req.userData = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized: Token verification failed',
            error: error.message
        });
    }
};

export default authWithUserDataMiddleware;

// import jwt from 'jsonwebtoken';
// import {userSchema} from "shared-schemas";
//
// const authWithUserDataMiddleware = async (req, res, next)=>{
//     try{
//         const token = req.body.token || req.query.token;
//         const decodedToken = jwt.verify(token , process.env.JWT_KEY);
//         req.userData = await userSchema.findById(decodedToken._id).select('username role keyMaster').exec();
//         next()
//     }catch (error) {
//         return res.status(401).json({
//             message:'Unauthorized'
//         })
//     }
// };
//
// export default authWithUserDataMiddleware