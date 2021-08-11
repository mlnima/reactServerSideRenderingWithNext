//checkRemovedContent
const postSchema = require('../../../models/postSchema');
const metaSchema = require('../../../models/metaSchema');
const axios = require('axios')
module.exports = (req, res) => {
    const checkUrl = req.body.checkUrl
    const contentId = req.body.contentId
    const type = req.body.type
    if (checkUrl) {
        axios(checkUrl).then(result => {
        }).catch(err => {
            if (err?.response?.status >= 400 && err?.response?.status < 499 || err.code === 'ENOTFOUND' ) {
                postSchema.findOneAndUpdate({mainThumbnail: checkUrl}, {$set: {status: 'pending'}}, {new: true}).exec()
                metaSchema.find({imageUrl:checkUrl}).exec().then(metas=>{

                    metas.forEach(meta=>{
                        metaSchema.findOneAndUpdate({_id:meta._id}, {$set: {imageUrl:null}}, {new: true}).exec()
                    })
                })
            }

        })
    }
    res.end()
}