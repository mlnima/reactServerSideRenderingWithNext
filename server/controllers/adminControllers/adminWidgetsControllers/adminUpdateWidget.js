const widgetSchema = require('../../../models/settings/widgetSchema');
const metaSchema = require('../../../models/metaSchema');
const postSchema = require('../../../models/postSchema');
const mongoose = require('mongoose');


const updatePostWidget = async (widget) => {
    const widgetData = widget?.data
    if (widgetData) {
        try {
            const sortMethod = widgetData.sortBy ? widgetData.sortBy === 'latest' ? {lastModify: -1} : {[widgetData.sortBy]: -1} : {lastModify: -1};
            const selectedMetaIdIsValid = widgetData.selectedMetaForPosts ? mongoose.Types.ObjectId.isValid(widgetData.selectedMetaForPosts) : false;
            const findSelectedMetaId = widgetData?.selectedMetaForPosts && selectedMetaIdIsValid ?
                widgetData?.selectedMetaForPosts :
                await metaSchema.findOne({name: widgetData?.selectedMetaForPosts}).select('_id').exec().then(meta => meta ? meta.id : null)
            const selectedMetaId = findSelectedMetaId ? findSelectedMetaId : null
            const selectedMeta = mongoose.Types.ObjectId.isValid(selectedMetaId) ? {$or: [{tags: selectedMetaId}, {categories: selectedMetaId}, {actors: selectedMetaId}]} : {}
            const countPosts = widgetData.sortBy === 'random' ? await postSchema.countDocuments({$and: [{status: 'published'}, selectedMeta]}).exec() : null
            const posts = widgetData.type === 'posts' || widgetData.type === 'postsSwiper' ?
                await postSchema.find({$and: [{status: 'published'}, selectedMeta]})
                    .select('_id')
                    .skip(widgetData.sortBy === 'random' ? Math.floor(Math.random() * countPosts) : false)
                    .limit(parseInt(widgetData.count))
                    .sort(sortMethod).exec() : []
            const dateForUpdateWidget = {
                ...widgetData,
                posts: posts.map(post => post._id)
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

    } else if (widgetData.type === 'meta' || widgetData.type === 'metaWithImage' ) {
        const metas = widgetData.metaType ? await metaSchema.find({type: widgetData.metaType}).select('_id').limit(parseInt(widgetData.count)).sort(sortMethod).exec() : []
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