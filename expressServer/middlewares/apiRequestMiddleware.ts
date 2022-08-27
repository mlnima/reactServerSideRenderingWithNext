import userSchema from '../models/userSchema';

const apiRequestMiddleware = async (req, res, next) => {
    const apiKey = req.body.apiKey
    const username = req.body.username
    try {
        const userData = await userSchema.findOne({username}).exec()
        if(!username || !apiKey || !userData.role || !userData.API_KEY){
            // throw new Error('Unauthorized')

            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
        if (userData.role === 'administrator' && userData.API_KEY === apiKey) {
            next()
        } else {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
    } catch (err) {
        console.log(err)
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
}

export default apiRequestMiddleware