const loggerMiddleware = (req, res, next) => {
    // console.log('loggerMiddleware:',req.path)

    next()
}

export default loggerMiddleware;