const loggerMiddleware = (req, res, next) => {
// console.log(req.url)
    next()
}

export default loggerMiddleware;