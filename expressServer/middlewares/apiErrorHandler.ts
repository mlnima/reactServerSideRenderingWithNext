const ApiError = require('../_variables/ApiError')

const apiErrorHandler = (err,req,res,next)=>{
    console.error(err)
    if (err instanceof ApiError){
        res.status(err.code).json(err.message)
        return
    }
    res.status(500).json('Something went wrong please try again later')
}

export default apiErrorHandler;