const widgetSchema = require('../../../models/settings/widgetSchema');
const commentSchema = require('../../../models/commentSchema');
const postSchema = require('../../../models/postSchema');
const metaSchema = require('../../../models/metaSchema');
const mongoose = require('mongoose');

module.exports = async (req, res) => {

    try {
        const widgetsDataQuery = (req.body.widgets || []).map(position => position === 'all' ? {} : {'data.position': position})
        const widgets = await widgetSchema.find({$or: widgetsDataQuery}).populate([
            {path: 'data.metaData'},
            {path: 'data.posts'},
        ]).exec()

        // const widgetsWithDynamicData = await widgets.map(async widget => {
        //     if (widget.data.type === 'meta'){
        //         console.log(widget.data)
        //     }
        //
        //     const widgetDataToObject = widget.toObject();
        //     const selectedMetaIdIsValid = widgetDataToObject.data?.selectedMetaForPosts ? mongoose.Types.ObjectId.isValid(widgetDataToObject.data?.selectedMetaForPosts) : false
        //
        //     const selectedMetaId = widgetDataToObject.data?.selectedMetaForPosts && selectedMetaIdIsValid ?
        //                            widgetDataToObject.data?.selectedMetaForPosts :
        //                            await metaSchema.findOne({name: widgetDataToObject.data?.selectedMetaForPosts}).select('_id').exec()
        //
        //
        //     const selectedMetaData = selectedMetaId ? typeof selectedMetaId === 'string' ? selectedMetaId : selectedMetaId._id : null
        //     //console.log(1,selectedMetaData)
        //     const selectedMeta = selectedMetaData ? {$or: [{tags: selectedMetaData}, {categories: selectedMetaData}, {actors: selectedMetaData}]} : {}
        //
        //     const countPosts = widgetDataToObject.data.sortBy === 'random' ? await postSchema.countDocuments({$and: [{status: 'published'}, selectedMeta]}).exec() : null
        //     const sortMethod = widgetDataToObject.data.sortBy ? widgetDataToObject.data.sortBy === 'latest' ? {lastModify: -1} : {[widgetDataToObject.data.sortBy]: -1} : {lastModify: -1};
        //     const posts = widgetDataToObject.data.type === 'posts' || widgetDataToObject.data.type === 'postsSwiper' ?
        //         await postSchema.find({$and: [{status: 'published'}, selectedMeta]})
        //             .select(' title , mainThumbnail , quality , likes , disLikes , views , duration , postType , price , translations , videoTrailerUrl ')
        //             .skip(widgetDataToObject.data.sortBy === 'random' ? Math.floor(Math.random() * countPosts) : false)
        //             .limit(parseInt(widgetDataToObject.data.count))
        //             .sort(sortMethod).exec() : []
        //     return {
        //         ...widgetDataToObject,
        //         data: {
        //             ...widgetDataToObject.data,
        //             metaData: widgetDataToObject.data.metaType ? await metaSchema.find({type: widgetDataToObject.data.metaType}).limit(parseInt(widgetDataToObject.data.count)).sort(sortMethod).exec() : [],
        //             posts,
        //             comments: widgetDataToObject.data.type === 'recentComments' ? await commentSchema.find({}).limit(parseInt(widgetDataToObject.data.count)).exec() : [],
        //         }
        //     }
        // })
        Promise.all(widgets).then(widgetsWithData => {
            res.json({widgets: widgetsWithData})
            res.end()
        }).catch(err => {
            console.log(err)
            res.end()
        })
    } catch (e) {
        console.log(e)
        res.end()
    }

}