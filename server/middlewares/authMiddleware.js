const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    try{
        const token = req.body.token || req.query.token
        req.userData = jwt.verify(token , process.env.JWT_KEY);
        next()
    }catch (error) {
        return res.status(401).json({
            message:'Unauthorized'
        })
    }
};