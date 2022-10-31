// @ts-ignore
import compression from 'compression';
//@ts-ignore
const shouldCompress = (req, res) => {
    if (req.headers['x-no-compression']) {
        return false
    }
    return compression.filter(req, res)
}

export default shouldCompress;