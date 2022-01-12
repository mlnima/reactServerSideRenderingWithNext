//queryGeneratorForGettingPosts
const mongoose = require("mongoose");
module.exports = data =>{
     const size = parseInt(data?.size || data?.count || process.env.NEXT_PUBLIC_SETTING_POSTS_COUNT_PER_PAGE || '30' );
     const sort = data?.sort || data?.sortBy;
     const meta = data.metaId || data?.selectedMetaForPosts;
     const validateId = meta ? mongoose?.isValidObjectId(meta) && meta.match(/^[0-9a-fA-F]{24}$/) : false;
     const metaQuery = validateId ? {$or: [{categories: meta}, {tags: meta}, {actors: meta}]} : {};
     const keyword = data.keyword ? decodeURIComponent(data.keyword) : ''
     const searchQuery = !keyword ? {} :
         !data.lang || data.lang === 'default' ? {$or: [{title: new RegExp(keyword, 'i')}]} :
             {$or: [{title: new RegExp(keyword, 'i')}, {[`translations.${data.lang}.title`]: new RegExp(keyword, 'i')}]}
    return {
         size : size > 1000 ? 1000 : size,
         page : data?.page ? parseInt(data?.page) : 1,
         postTypeQuery : data?.postType ? {postType: data.postType} : {},
         statusQuery : data?.status ? data?.status === 'all' ? {status: {$ne: 'trash'}} : {status: data.status} : {status: 'published'} ,
         authorQuery : data.author ? data.author === 'all' ? {} : {author: data.author}:{},
         metaQuery,
         searchQuery,
         selectedFields : data.fields && data.fields?.length || !data.fields ? [] : data.fields,
         sortQuery : sort === 'createdAt' || sort === 'random' || !sort ? {} : {[sort]: -1}
    }
}