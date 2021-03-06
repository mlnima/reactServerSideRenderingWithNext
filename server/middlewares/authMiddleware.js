const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    try{
        req.userData = jwt.verify(req.body.token, process.env.REACT_APP_JWT_KEY);
        next()
    }catch (error) {
        return res.status(401).json({
            message:'Unauthorized'
        })
    }
};