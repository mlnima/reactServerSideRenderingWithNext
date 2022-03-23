const {isValidObjectId} = require("mongoose");

module.exports = data => {
    const excludesPostFromSources = process.env.EXCLUDE_POSTS_SOURCE ? process.env.EXCLUDE_POSTS_SOURCE.split(' ') : [];


    const excludeContent = excludesPostFromSources.map(excludeWord => {

        const expression = `.*${excludeWord}.*`

        return {'videoEmbedCode': {$not: new RegExp(expression, "g")}}
    })

    const excludeQuery = {$or: excludeContent}

    const size = parseInt(data?.size || data?.count || '20') || 20;
    const sort = data?.sort || data?.sortBy;
    const meta = data.metaId || data?.selectedMetaForPosts;
    const validateId = meta ? isValidObjectId(meta) && meta.match(/^[0-9a-fA-F]{24}$/) : false;
    const metaQuery = validateId ? {$or: [{categories: {$in: meta}}, {tags: {$in: meta}}, {actors: {$in: meta}}]} : {};
    const keyword = data.keyword ? decodeURIComponent(data.keyword) : ''
    const searchQuery = !keyword ? {} :
        !data.lang || data.lang === 'default' ? {$or: [{title: new RegExp(keyword, 'i')}]} :
            {$or: [{title: new RegExp(keyword, 'i')}, {[`translations.${data.lang}.title`]: new RegExp(keyword, 'i')}]}

    return {
        size: size > 1000 ? 1000 : size,
        page: data?.page ? parseInt(data?.page) : 1,
        postTypeQuery: data?.postType ? {postType: data.postType} : {},
        statusQuery: {status: 'published'},
        authorQuery: data.author ? data.author === 'all' ? {} : {author: data.author} : {},
        excludeQuery: process.env.EXCLUDE_POSTS_SOURCE ? excludeQuery : {},
        metaQuery,
        searchQuery,
        selectedFields: data?.field || [] ,
        sortQuery: sort === 'createdAt' || sort === 'random' || !sort ? {} : {[sort]: -1}
    }
}