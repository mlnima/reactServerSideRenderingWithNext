const jwt = require('jsonwebtoken')
const userSchema = require('../models/userSchema')

module.exports = async (req, res, next) => {

    try {
        const token = req.body.token || req.query.token
        const verifiedToken = jwt.verify(token, process.env.JWT_KEY)
        await userSchema.findById(verifiedToken._id).exec().then(user => {
            if (user.role === 'administrator') {
                req.userData = verifiedToken
                next()
            } else {
                return res.status(401).json({
                    message: 'Unauthorized'
                })
            }
        })

    } catch ( error ) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
};