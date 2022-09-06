// const widgetSchema = require('../../../models/widgetSchema');
// const metaSchema = require('../../../models/metaSchema');
// const postSchema = require('../../../models/postSchema');
// const _clientQueryGeneratorForGettingPosts = require('../../clientControllers/_variables/_clientQueryGeneratorForGettingPosts')

import widgetSchema from '../../../models/widgetSchema';
import metaSchema from '../../../models/metaSchema';
import postSchema from '../../../models/postSchema';
import _clientQueryGeneratorForGettingPosts from '../../clientControllers/_variables/_clientQueryGeneratorForGettingPosts';


export const updatePostWidgetData = async (widgetData) => {
    if (widgetData) {
        try {
            const findingPostsOptions = _clientQueryGeneratorForGettingPosts(widgetData, widgetData?.selectedMetaForPosts)

            //console.log(JSON.stringify(findingPostsOptions.findPostsQueries, null, '\t'))
            let totalCount = await postSchema.countDocuments(findingPostsOptions.findPostsQueries).exec()
            let posts = await postSchema.find(findingPostsOptions.findPostsQueries, ['_id'],
                {
                    skip: widgetData.sortBy === 'random' ? Math.floor(Math.random() * totalCount) : (findingPostsOptions.size * findingPostsOptions.page) - findingPostsOptions.size,
                    limit: findingPostsOptions.size,
                    sort: findingPostsOptions.sortQuery
                }).exec()


            return {
                ...widgetData,
                uniqueData: {
                    ...(widgetData?.uniqueData || {}),
                    posts: posts.map(post => post?._id),
                    totalCount
                }
            }
        } catch (err) {
            console.log(err)
            return null
        }
    } else {
        return null
    }
}


const updateMetaWidgetData = async (widgetData) => {
    try {
        const sortQuery = widgetData.sort === 'createdAt' || !widgetData.sort ?
            {'rank': 1, 'likes': -1, 'views': -1, 'count': -1, 'updatedAt': -1, 'createdAt': -1} :
            widgetData.sort === 'rank' ? {'rank': 1} : {[widgetData.sort]: -1}

        const countQuery = {count: {$gt: 0}}
        const typeQuery = {type: widgetData?.metaType || 'categories'}
        const statusQuery = {status: 'published'}
        let totalCount = await metaSchema.countDocuments({$and: [countQuery, typeQuery, statusQuery]}).exec()

        const metas = await metaSchema.find(
            {$and: [countQuery, typeQuery, statusQuery]},
            {},
            {
                sort: sortQuery,
                limit: widgetData?.count || 20
            }
        ).select('_id').exec()

        return {
            ...widgetData,
            uniqueData: {
                metaData: metas.map(meta => meta._id),
                totalCount
            }
        }
    } catch (err) {
        console.log(err)
        return null
    }
}


export const adminUpdateWidget = async (req, res) => {
    const widgetData = req.body?.widgetData?.data
    const widgetId = req.body?.widgetData?._id



    if (widgetData.type === 'posts' || widgetData.type === 'postsSlider' || widgetData.type === 'postsSwiper') {
      await updatePostWidgetData(widgetData).then(async updatedWidget => {
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
    }



    else if (widgetData.type === 'meta' || widgetData.type === 'metaWithImage') {
      await  updateMetaWidgetData(widgetData).then(updatedWidget=>{
          if (updatedWidget){
              widgetSchema.findByIdAndUpdate(widgetId, {data: updatedWidget}, {new: true}).exec().then(updatedWidget => {
                  res.json({updatedWidget})
              }).catch(err => {
                  console.log(err)
                  res.status(503).json({message: 'something went wrong please try again later'})
              })
          } else {
              res.status(503).json({message: 'something went wrong please try again later'})
          }
      })
    }



    else {
        widgetSchema.findByIdAndUpdate(req.body?.widgetData._id, {data: widgetData}, {new: true}).exec().then(updatedWidget => {
            res.json({updatedWidget})
        }).catch(err => {
            console.log(err)
        })
    }
}

// module.exports = {adminUpdateWidget, updatePostWidgetData}




// const countQuery = {count: {$gt: 0}}
// const typeQuery = {type: widgetData.metaType}
// const statusQuery = {status: 'published'}
// let totalCount = await metaSchema.countDocuments({$and: [countQuery, typeQuery, statusQuery]}).exec()
//
// const metas = widgetData.metaType ? await metaSchema.find(
//     {$and: [countQuery, typeQuery, statusQuery]},
//     {},
//     {
//         sort: widgetData.sort === 'createdAt' || !widgetData.sort ?
//             {'rank': 1, 'likes': -1, 'views': -1, 'count': -1, 'updatedAt': -1, 'createdAt': -1} :
//             widgetData.sort === 'rank' ? {'rank': 1} : {[widgetData.sort]: -1},
//     }
// ).select('_id').limit(parseInt(widgetData?.count || 20)).sort(sortMethod).exec() : []
// const dateForUpdateWidget = {
//     ...widgetData,
//     uniqueData: {
//         metaData: metas.map(meta => meta._id),
//         totalCount
//     }
// }
// widgetSchema.findByIdAndUpdate(req.body?.widgetData._id, {data: dateForUpdateWidget}, {new: true}).exec().then(updatedWidget => {
//     res.json({updatedWidget})
// }).catch(err => {
//     console.log(err)
// })