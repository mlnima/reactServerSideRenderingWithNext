const apicache = require('apicache');

module.exports = (req, res) => {

    apicache.clear(req.params.collection)
    console.log('api cache cleared')
    res.end()
};