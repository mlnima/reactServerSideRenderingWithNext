// @ts-nocheck
import jwt from 'jsonwebtoken';
import {userSchema} from "models";

//need to add a check for the user type
const authWithUserDataMiddleware = async (req, res, next)=>{
    try{
        const token = req.body.token || req.query.token;
        const decodedToken = jwt.verify(token , process.env.JWT_KEY);
        req.userData = await userSchema.findById(decodedToken._id).select('username role keyMaster').exec();
        next()
    }catch (error) {
        return res.status(401).json({
            message:'Unauthorized'
        })
    }
};

export default authWithUserDataMiddleware