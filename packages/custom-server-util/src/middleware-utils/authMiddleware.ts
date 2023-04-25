import jwt from 'jsonwebtoken';
const authMiddleware =  (req,res,next)=>{

    const authHeader = req.headers.authorization;
    const token = req.body.token || req.query.token || (authHeader && authHeader.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try{
        req.userData = jwt.verify(token , process.env.JWT_KEY);
        next()
    }catch (error) {
        return res.status(403).json({ message: 'Invalid Or Expired token' })
    }
};

export default authMiddleware;