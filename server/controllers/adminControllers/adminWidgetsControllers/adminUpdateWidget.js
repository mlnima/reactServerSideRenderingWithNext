const widgetSchema = require('../../../models/widgetSchema');
const metaSchema = require('../../../models/metaSchema');
const postSchema = require('../../../models/postSchema');
const _clientQueryGeneratorForGettingPosts = require('../../clientControllers/_variables/_clientQueryGeneratorForGettingPosts')
// const {map} = require("lodash");


const updatePostWidget = async (widget) => {
    const widgetData = widget?.data
    if (widgetData) {
        try {
            const findingPostsOptions = _clientQueryGeneratorForGettingPosts(widget?.data)
            let totalCount = await postSchema.countDocuments(findingPostsOptions.findPostsQueries).exec()
            let posts = await postSchema.find(findingPostsOptions.findPostsQueries, ['_id'],
                {
                    skip: widgetData.sortBy === 'random' ? Math.floor(Math.random() * totalCount) : (findingPostsOptions.size * findingPostsOptions.page) - findingPostsOptions.size,
                    limit: findingPostsOptions.size,
                    sort: findingPostsOptions.sortQuery
                }).exec()

            const dateForUpdateWidget = {
                ...widgetData,
                uniqueData:{
                    ...(widgetData?.uniqueData || {}),
                    posts:posts.map(post=>post?._id),
                    totalCount
                }
            }
            return dateForUpdateWidget
        } catch (err) {
            console.log(err)
            return null
        }
    } else {
        return null
    }
}


const adminUpdateWidget = async (req, res) => {
    const widgetData = req.body?.widgetData?.data
    const widgetId = req.body?.widgetData?._id
    const sortMethod = widgetData.sortBy ? widgetData.sortBy === 'latest' ? {lastModify: -1} : {[widgetData.sortBy]: -1} : {lastModify: -1};
    if (widgetData.type === 'posts' || widgetData.type === 'postsSlider' ||  widgetData.type ===  'postsSwiper' ) {
        updatePostWidget(req.body?.widgetData).then(async updatedWidget => {
            if (updatedWidget) {
                await widgetSchema.findByIdAndUpdate(widgetId, {data: updatedWidget}, {new: true}).exec().then(updatedWidget => {
                    res.json({updatedWidget})
                }).catch(err => {
                    console.log(err)
                    res.status(503).json({message: 'something went wrong please try again later'})
                })
            } else {
                res.status(503).json({message: 'something went wrong please try again later'})
            }

        })

    } else if (widgetData.type === 'meta' || widgetData.type === 'metaWithImage') {
        const countQuery = {count: {$gt: 0}}
        const typeQuery = {type: widgetData.metaType}
        const statusQuery = {status: 'published'}
        const metas = widgetData.metaType ? await metaSchema.find(
            {$and: [countQuery, typeQuery, statusQuery]},
            {},
            {
                // sort:widgetData.sort === 'createdAt' || !widgetData.sort ? {} : {[widgetData.sort]: -1},
                sort:widgetData.sort === 'createdAt' || !widgetData.sort ?
                     {'rank':1,'likes':-1,'views':-1,'count':-1,'updatedAt':-1,'createdAt':-1} :
                     widgetData.sort === 'rank' ? {'rank': 1} : {[widgetData.sort]: -1},
            }
        ).select('_id').limit(parseInt(widgetData.count)).sort(sortMethod).exec() : []
        const dateForUpdateWidget = {
            ...widgetData,
            uniqueData:{
                metaData: metas.map(meta => meta._id),
            }
        }
        widgetSchema.findByIdAndUpdate(req.body?.widgetData._id, {data: dateForUpdateWidget}, {new: true}).exec().then(updatedWidget => {
            res.json({updatedWidget})
        }).catch(err => {
            console.log(err)
        })
    } else {

        widgetSchema.findByIdAndUpdate(req.body?.widgetData._id, {data: req.body?.widgetData.data}, {new: true}).exec().then(updatedWidget => {
            res.json({updatedWidget})
        }).catch(err => {
            console.log(err)
        })
    }


}

module.exports = {adminUpdateWidget, updatePostWidget}