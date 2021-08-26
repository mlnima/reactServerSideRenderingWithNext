//checkRemovedContent
const postSchema = require('../../../models/postSchema');
const metaSchema = require('../../../models/metaSchema');
const widgetSchema = require('../../../models/settings/widgetSchema');
const axios = require('axios')
const {updatePostWidget} = require("../../adminControllers/adminWidgetsControllers/adminUpdateWidget");
module.exports = (req, res) => {
    const checkUrl = req.body.checkUrl
    if (checkUrl) {
        axios(checkUrl).then(result => {
        }).catch(async err => {
            if (err?.response?.status >= 400 && err?.response?.status < 499 || err.code === 'ENOTFOUND') {
                await postSchema.findOneAndUpdate({mainThumbnail: checkUrl}, {$set: {status: 'pending'}}, {new: true}).exec().then(post => {
                    widgetSchema.findOne({'data.posts': post._id}).exec().then(widget => {
                        if (widget) {
                            updatePostWidget(widget).then(updatedWidgets => {
                                widgetSchema.findByIdAndUpdate(widget._id, {'data.posts': [...updatedWidgets.posts]}, {new: true}).exec()
                            })
                        }
                    })
                })


                //update meta if has this post image
                await metaSchema.findOne({imageUrl: checkUrl}).exec().then(meta => {
                    if (meta) {
                        postSchema.findOne({$and: [{[meta.type]: meta._id}, {status: 'published'}]}).exec().then(post => {
                            if (post) {
                                metaSchema.findByIdAndUpdate(meta._id, {$set: {imageUrl: post.mainThumbnail}}, {new: true}).exec().then(updatedMeta => {
                                    res.json({newImageUrl: updatedMeta.imageUrl})
                                    res.end()
                                }).catch(err => {
                                    console.log(err)
                                    res.end()
                                })
                            } else {
                                res.end()
                            }

                        }).catch(err => {
                            res.end()
                        })

                    } else {
                        res.end()
                    }
                })
            } else {
                res.end()
            }

        })
    } else {
        res.end()
    }

}