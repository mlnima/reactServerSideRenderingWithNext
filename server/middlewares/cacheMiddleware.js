const apiCache = require('apicache')
const cache = apiCache.middleware;
module.exports = (req,res,next)=>{

    try{
        if (res.statusCode === 200){

        }


        cache('1 day', res.statusCode === 200);
        next()
    }catch (error) {
        console.log(error)
        next()
    }
};