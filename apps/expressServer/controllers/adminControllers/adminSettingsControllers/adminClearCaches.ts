import apicache from 'apicache';

const adminClearCaches = (req, res) => {

    apicache.clear(req.params.collection)
    console.log('api cache cleared')
    res.end()

};

export default adminClearCaches;