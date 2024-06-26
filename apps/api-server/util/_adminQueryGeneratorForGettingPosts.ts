import {isValidObjectId}  from 'mongoose';
import {excludePostsBySourceQueryGenerator} from "@util/database-util";

const _adminQueryGeneratorForGettingPosts = (data) => {



    const meta = data.metaId || data?.uniqueData?.selectedMetaForPosts || data?.selectedMetaForPosts;
    const validateId = meta ? isValidObjectId(meta) && meta?.match(/^[0-9a-fA-F]{24}$/) : false;
    const metaQuery = validateId ? [{$or: [{categories: {$in: meta}}, {tags: {$in: meta}}, {actors: {$in: meta}}]}] : [];
    const keyword = data.keyword ? decodeURIComponent(data.keyword) : ''

    const searchQuery = !keyword ? [] :
        !data.lang || data.lang === 'default' ? [{$or: [{title: new RegExp(keyword, 'i')}]}] :
            [{$or: [{title: new RegExp(keyword, 'i')}, {[`translations.${data.lang}.title`]: new RegExp(keyword, 'i')}]}]

    const statusQuery =  data?.status ?
        data?.status === 'all' ? [{status: {$ne: 'trash'}}] : [{status: data.status}]
        : [{status: 'published'}]

    const postTypeQuery = data?.postType ? [{postType: data.postType}] : []
    const authorQuery = data.author ? [{author: data.author}] : []
    return {
        findPostsQueries:{$and:[
                ...postTypeQuery,
                ...authorQuery,
                ...excludePostsBySourceQueryGenerator(),
                ...searchQuery,
                ...metaQuery,
                ...statusQuery
            ]
        },
        selectedFields: data?.field || [] ,
    }
}

export default _adminQueryGeneratorForGettingPosts;