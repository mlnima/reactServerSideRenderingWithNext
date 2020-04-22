const jwt = require('jsonwebtoken')
const userSchema = require('../models/userSchema')
const jwtDecode = require('jwt-decode')

module.exports = async (req, res, next) => {

    try {
        const verifiedToken = jwt.verify(req.body.token, process.env.REACT_APP_JWT_KEY)
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