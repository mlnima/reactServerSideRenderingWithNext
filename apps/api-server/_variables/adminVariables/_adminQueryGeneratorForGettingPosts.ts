import {isValidObjectId}  from 'mongoose';

const _adminQueryGeneratorForGettingPosts = (data) => {

    const excludeContent = (process.env.EXCLUDE_POSTS_SOURCE ? process.env.EXCLUDE_POSTS_SOURCE.split(' ') : []).map(excludeWord => {

        const expression = `.*${excludeWord}.*`

        return {'videoEmbedCode': {$not: new RegExp(expression, "g")}}
    })

    const excludeQuery = process.env.EXCLUDE_POSTS_SOURCE ? [{$or: excludeContent}] : []
    const size = data?.size;
    const sort = data?.sort || data?.sortBy;
    const meta = data.metaId || data?.selectedMetaForPosts;
    const validateId = meta ? isValidObjectId(meta) && meta?.match(/^[0-9a-fA-F]{24}$/) : false;
    const metaQuery = validateId ? [{$or: [{categories: {$in: meta}}, {tags: {$in: meta}}, {actors: {$in: meta}}]}] : [];
    const keyword = data.keyword ? decodeURIComponent(data.keyword) : ''

    const searchQuery = !keyword ? [] :
        !data.lang || data.lang === 'default' ? [{$or: [{title: new RegExp(keyword, 'i')}]}] :
            [{$or: [{title: new RegExp(keyword, 'i')}, {[`translations.${data.lang}.title`]: new RegExp(keyword, 'i')}]}]

    const sortQuery = sort === 'createdAt' || sort === 'random' || !sort ? {} :
           sort === 'updatedAt' ? {updatedAt: -1,createdAt: -1}:
            {[sort]: -1}

    const statusQuery =  data?.status ?
        data?.status === 'all' ? [{status: {$ne: 'trash'}}] : [{status: data.status}]
        : [{status: 'published'}]



    const postTypeQuery = data?.postType ? [{postType: data.postType}] : []
    const authorQuery = data.author ? [{author: data.author}] : []
    return {
        findPostsQueries:{$and:[
                ...postTypeQuery,
                ...authorQuery,
                ...excludeQuery,
                ...searchQuery,
                ...metaQuery,
                ...statusQuery
            ]
        },
        size: size > 1000 ? 1000 : size,
        page: data?.page ? parseInt(data?.page) : 1,
        selectedFields: data?.field || [] ,
        sortQuery,
    }
}

export default _adminQueryGeneratorForGettingPosts;