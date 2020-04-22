const uuidAPIKey = require('uuid-apikey');
const userSchema = require('../models/userSchema')

module.exports =async (req,res,next) =>{
    const apiKey = req.body.apiKey
    const username = req.body.username
    try{
        const userData = await userSchema.findOne({username}).exec()
        if(userData.role === 'administrator'&&userData.API_KEY===apiKey){
            next()
        }else {
            return res.status(401).json({
                message:'Unauthorized'
            })
        }
    }catch ( e ) {
        console.log( e )
        return res.status(401).json({
            message:'Unauthorized'
        })
    }
}