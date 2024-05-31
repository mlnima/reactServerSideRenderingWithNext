import {MetaSchema,PostSchema,WidgetSchema} from 'shared-schemas';
import axios from 'axios'
// import {updateWidget} from '../../adminControllers/widgets/updateWidget'

const checkRemovedContent = (req, res) => {
    const checkUrl = req.body.checkUrl
    if (checkUrl) {
        axios(checkUrl).then(result => {
        }).catch(async err => {
            if (err?.response?.status >= 400 && err?.response?.status < 499 || err.code === 'ENOTFOUND') {
                await PostSchema.findOneAndUpdate({mainThumbnail: checkUrl}, {$set: {status: 'pending'}}, {new: true}).exec().then(post => {
                    WidgetSchema.findOne({'data.posts': post._id}).exec().then(widget => {
                        if (widget) {
                            // updatePostsWidget(widget).then(updatedWidgets => {
                            //     widgetSchema.findByIdAndUpdate(widget._id, {'data..uniqueData.posts': [...updatedWidgets.posts]}, {new: true}).exec()
                            // })
                        }
                    })
                })


                //update meta if has this post image
                await MetaSchema.findOne({imageUrl: checkUrl}).exec().then(meta => {
                    if (meta) {
                        PostSchema.findOne({$and: [{[meta.type]: meta._id}, {status: 'published'}]}).exec().then(post => {
                            if (post) {
                                MetaSchema.findByIdAndUpdate(meta._id, {$set: {imageUrl: post.mainThumbnail}}, {new: true}).exec().then(updatedMeta => {
                                    res.json({newImageUrl: updatedMeta.imageUrl})

                                }).catch(err => {
                                    console.log(err)

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

export default checkRemovedContent