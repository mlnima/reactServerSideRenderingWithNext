const widgetSchema = require('../../../models/widgetSchema');
const metaSchema = require('../../../models/metaSchema');
const postSchema = require('../../../models/postSchema');
const _queryGeneratorForGettingPosts = require('../../clientControllers/_variables/_queryGeneratorForGettingPosts')


const updatePostWidget = async (widget) => {
    const widgetData = widget?.data
    if (widgetData) {
        try {
            const findingPostsOptions = _queryGeneratorForGettingPosts(widget?.data)
            const findPostsQueries = {$and: [findingPostsOptions.postTypeQuery, findingPostsOptions.statusQuery, findingPostsOptions.authorQuery, findingPostsOptions.searchQuery, findingPostsOptions.metaQuery]}
            let totalCount = await postSchema.countDocuments(findPostsQueries).exec()
            let posts = await postSchema.find(findPostsQueries, ['_id'],
                {
                    skip: widgetData.sortBy === 'random' ? Math.floor(Math.random() * totalCount) : findingPostsOptions.size * (findingPostsOptions.page - 1),
                    limit: findingPostsOptions.size,
                    sort: findingPostsOptions.sortQuery
                }).exec()
            const dateForUpdateWidget = {
                ...widgetData,
                posts
            }
            return dateForUpdateWidget
        } catch (error) {
            console.log(error)
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
    if (widgetData.type === 'posts') {
        updatePostWidget(req.body?.widgetData).then(async updatedWidgets => {
            if (updatedWidgets) {
                await widgetSchema.findByIdAndUpdate(widgetId, {data: updatedWidgets}, {new: true}).exec().then(updatedWidgets => {

                    res.json({updatedWidgets})
                    res.end()
                }).catch(error => {
                    console.log(error)
                    res.status(503).json({message: 'something went wrong please try again later'})
                    res.end()
                })
            } else {
                res.status(503).json({message: 'something went wrong please try again later'})
                res.end()
            }

        })

    } else if (widgetData.type === 'meta' || widgetData.type === 'metaWithImage') {
        const countQuery = {count: {$gt: 0}}
        const typeQuery = {type: widgetData.metaType}
        const statusQuery = {status: 'published'}
        const metas = widgetData.metaType ? await metaSchema.find({$and: [countQuery, typeQuery, statusQuery]}).select('_id').limit(parseInt(widgetData.count)).sort(sortMethod).exec() : []
        const dateForUpdateWidget = {
            ...widgetData,
            metaData: metas.map(meta => meta._id),

        }
        widgetSchema.findByIdAndUpdate(req.body?.widgetData._id, {data: dateForUpdateWidget}, {new: true}).exec().then(updatedWidgets => {
            res.json({updatedWidgets})
            res.end()
        }).catch(err => {
            console.log(err)
        })
    } else {
        widgetSchema.findByIdAndUpdate(req.body?.widgetData._id, {data: req.body?.widgetData.data}, {new: true}).exec().then(updatedWidgets => {
            res.json({updatedWidgets})
            res.end()
        }).catch(err => {
            console.log(err)
        })
    }


}

module.exports = {adminUpdateWidget, updatePostWidget}