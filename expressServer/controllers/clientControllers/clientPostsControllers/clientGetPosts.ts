//clientGetPosts
// import postSchema from '../../../models/postSchema'
// import metaSchema from '../../../models/metaSchema'
// import settingSchema from '../../../models/settings/settingSchema'

import postSchema from '../../../models/postSchema';
import settingSchema from '../../../models/settings/settingSchema';
import metaSchema from '../../../models/metaSchema';
import searchKeywordSchema from '../../../models/searchKeywordSchema'
import _clientQueryGeneratorForGettingPosts from '../../../_variables/serverClientVariables/_clientQueryGeneratorForGettingPosts'
import mongoIdValidator from '../../../../_variables/serverUtil/mongoIdValidator';
import postFieldRequestForCards from "../../../../_dataStructures/postFieldRequestForCards";
//import postSchema from '@expressServer/models/postSchema'
// const postSchema = require('../../../models/postSchema');
// const metaSchema = require('../../../models/metaSchema');
// const searchKeywordSchema = require('../../../models/searchKeywordSchema');
// const _clientQueryGeneratorForGettingPosts = require('../_variables/_clientQueryGeneratorForGettingPosts');
// const mongoIdValidator = require('../../../util/mongoIdValidator');
// const settingSchema = require("../../../models/settings/settingSchema");
// const {Worker, isMainThread,parentPort} = require('worker_threads');
// import path from 'path';
// import getPostsWorker from '../../../workers/ApiWorkers/clientRequests/posts/getPosts';

const saveSearchedKeyword = async (keyword, count) => {
    if (keyword) {
        await searchKeywordSchema.findOneAndUpdate(
            {name: keyword},
            {name: keyword, count},
            {upsert: true}).exec()
    }
}

const getMetaForGettingPostsRequest = async (meta)=>{
    try {
        if (mongoIdValidator(meta)){
            return await metaSchema.findById(meta).exec()
        }else {
            return await metaSchema.findOne({name:{$regex:decodeURIComponent(meta),$options:'i'}})
        }
    }catch (err){
        return {}
    }
}

const clientGetPosts =  async (req, res) => {
    try {

        const identitySetting = await settingSchema.findOne({type:'identity'}).exec()

        const meta = req.query?.metaId || req.query?.selectedMetaForPosts ?
            await getMetaForGettingPostsRequest(req.query?.metaId || req.query?.selectedMetaForPosts) || {} : {}

        const findingPostsOptions = _clientQueryGeneratorForGettingPosts({
            ...req.query,
            //@ts-ignore
            size: req.query.size === 'undefined' ? identitySetting?.data?.postsCountPerPage : parseInt(req.query.size),
            page: req.query.page === 'undefined' ? 1 : parseInt(req.query.page)
            //@ts-ignore
        },meta?._id)

        // console.log(JSON.stringify(findingPostsOptions, null, '\t'))
        // const populateMeta = [
        //     {path: 'actors', select: {'name': 1, 'type': 1}},
        //     {path: 'categories', select: {'name': 1, 'type': 1, 'imageUrl': 1}},
        //     {path: 'tags', select: {'name': 1, 'type': 1}}
        // ]

        const totalCount = await postSchema.countDocuments(findingPostsOptions.findPostsQueries).exec();
        const posts = await postSchema.find(findingPostsOptions.findPostsQueries, findingPostsOptions.selectedFields,
            {
                skip: req.body.sort === 'random' ? Math.floor(Math.random() * totalCount) : (findingPostsOptions.size * findingPostsOptions.page) - findingPostsOptions.size,
                limit: findingPostsOptions.size,
                sort: findingPostsOptions.sortQuery
            })
            // .populate(populateMeta)
            .exec()

        if (req.query?.keyword) {
            await saveSearchedKeyword(req.query?.keyword, totalCount)
        }

        res.json({posts, totalCount, meta})
    } catch (err) {
        console.log(err.stack)
        return res.status(404).json({
            message: 'Server Error'
        })
    }
};

export default clientGetPosts

// const meta = req.query?.metaId || req.query?.selectedMetaForPosts ? await metaSchema.findById(req.query?.metaId || req.query?.selectedMetaForPosts).exec() : {}


//const findPostsQueries = {$and: [findingPostsOptions.postTypeQuery, findingPostsOptions.statusQuery, findingPostsOptions.excludeQuery, findingPostsOptions.authorQuery, findingPostsOptions.searchQuery, findingPostsOptions.metaQuery]}
// const findPostsQueries = {$and: [findingPostsOptions.postTypeQuery, findingPostsOptions.statusQuery, findingPostsOptions.excludeQuery, findingPostsOptions.authorQuery, findingPostsOptions.searchQuery, findingPostsOptions.metaQuery]}

//skip: req.body.sort === 'random' ? Math.floor(Math.random() * totalCount) : findingPostsOptions.size * (findingPostsOptions.page - 1),








// const identitySetting = await settingSchema.findOne({type:'identity'}).exec()
//
// const meta = req.query?.metaId || req.query?.selectedMetaForPosts ?
//     await getMetaForGettingPostsRequest(req.query?.metaId || req.query?.selectedMetaForPosts) || {} : {}
//
// const findingPostsOptions = _clientQueryGeneratorForGettingPosts({
//     ...req.query,
//     size: req.query.size === 'undefined' ? identitySetting?.data?.postsCountPerPage : parseInt(req.query.size),
//     page: req.query.page === 'undefined' ? 1 : parseInt(req.query.page)
// },meta?._id)
//
// // console.log(JSON.stringify(findingPostsOptions, null, '\t'))
// const populateMeta = [
//     {path: 'actors', select: {'name': 1, 'type': 1}},
//     {path: 'categories', select: {'name': 1, 'type': 1, 'imageUrl': 1}},
//     {path: 'tags', select: {'name': 1, 'type': 1}}
// ]
//
// const totalCount = await postSchema.countDocuments(findingPostsOptions.findPostsQueries).exec();
// const posts = await postSchema.find(findingPostsOptions.findPostsQueries, findingPostsOptions.selectedFields,
//     {
//         skip: req.body.sort === 'random' ? Math.floor(Math.random() * totalCount) : (findingPostsOptions.size * findingPostsOptions.page) - findingPostsOptions.size,
//         limit: findingPostsOptions.size,
//         sort: findingPostsOptions.sortQuery
//     })
//     .populate(populateMeta)
//     .exec()
//
// if (req.query?.keyword) {
//     await saveSearchedKeyword(req.query?.keyword, totalCount)
// }
//
// res.json({posts, totalCount, meta})
// } catch (err) {
//     console.log(err.stack)
//     return res.status(404).json({
//         message: 'Server Error'
//     })
// }