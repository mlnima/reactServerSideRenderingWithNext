const compression = require('compression')

module.exports = (req, res) =>{
    if (req.headers['x-no-compression']) {
        return false
    }
    return compression.filter(req, res)
}